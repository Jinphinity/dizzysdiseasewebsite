import { LocalProfileRepository } from './adapters/storage/local-profile-repository.js';
import { createAnalytics } from './application/create-analytics.js';
import { createAudio } from './application/create-audio.js';
import { createContactService } from './application/create-contact-service.js';
import { createGameEngine } from './application/create-game-engine.js';
import { resolveEncounterShot } from './application/resolve-encounter-shot.js';
import { getEncounter } from './content/encounters.js';
import { MERCHANT_CATALOG } from './content/merchant-catalog.js';
import { ROUTE_ORDER, getRoute } from './content/routes.js';
import { hrefToRoute, routeToHref } from './content/route-hrefs.js';
import './styles/base.css';
import { renderApp } from './ui/render-app.js';
import { handleAction } from './ui/handle-action.js';
import { handleHotspotClick } from './ui/handle-hotspot.js';
import { handleFormSubmit } from './ui/handle-form.js';

function getRouteFromLocation() {
  const explicit = document.body.dataset.initialRoute;
  if (explicit && ROUTE_ORDER.includes(explicit)) {
    return explicit;
  }

  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  return hrefToRoute(fileName);
}

async function bootstrap() {
  const app = document.getElementById('app');
  const repository = new LocalProfileRepository();
  const engine = await createGameEngine({ repository });
  const analytics = createAnalytics();
  const audio = createAudio();
  const contactService = createContactService();

  const routePath = getRouteFromLocation();
  let statusMessage = 'Mission online. Inspect environment and proceed.';
  let puzzleStatus = null;
  let contactStatus = null;
  let lockedHotspotId = null;
  let lockedHotspotTimer = null;
  let frameIndex = 0;
  let lastFrameAt = 0;

  engine.viewRoute(routePath);
  analytics.track('route_view', { route: routePath });

  function getEncounterFrameSrc() {
    const state = engine.getState();
    if (!state.encounter.activeId) {
      return '';
    }

    const encounter = getEncounter(state.encounter.activeId);
    if (!encounter) {
      return '';
    }

    return encounter.frames[frameIndex % encounter.frames.length];
  }

  function render() {
    const route = getRoute(routePath);

    renderApp({
      target: app,
      route,
      routeOrder: ROUTE_ORDER,
      state: engine.getState(),
      encounterFrameSrc: getEncounterFrameSrc(),
      catalog: MERCHANT_CATALOG,
      statusMessage,
      puzzleStatus,
      contactStatus,
      isMuted: audio.isMuted(),
      lockedHotspotId
    });
  }

  function navigate(to) {
    if (!ROUTE_ORDER.includes(to)) {
      return;
    }

    window.location.href = routeToHref(to);
  }

  function handleViewportShot(event) {
    const state = engine.getState();
    if (!state.encounter.activeId) {
      return;
    }

    const encounter = getEncounter(state.encounter.activeId);
    if (!encounter) {
      return;
    }

    const viewport = event.currentTarget;
    const rect = viewport.getBoundingClientRect();
    const point = {
      x: (event.clientX - rect.left) * (encounter.designWidth / rect.width),
      y: (event.clientY - rect.top) * (encounter.designHeight / rect.height)
    };

    const shot = resolveEncounterShot({
      encounter,
      frameIndex,
      point
    });

    if (!shot.hit) {
      statusMessage = 'Shot missed. Stabilize aim and fire again.';
      analytics.track('encounter_miss', { route: routePath, encounterId: encounter.id });
      audio.play('miss');
      render();
      return;
    }

    engine.damageEncounter({ damage: shot.damage });
    analytics.track('encounter_hit', { route: routePath, encounterId: encounter.id, damage: shot.damage });
    audio.play('hit');

    if (engine.getState().encounter.hp <= 0) {
      engine.completeEncounter({ encounterId: encounter.id, rewardLoot: encounter.stats.rewardLoot });
      analytics.track('encounter_complete', {
        route: routePath,
        encounterId: encounter.id,
        rewardLoot: encounter.stats.rewardLoot
      });
      audio.play('success');
      statusMessage = `Encounter neutralized. Reward: +${encounter.stats.rewardLoot} loot. Archive door unlocked.`;
    } else {
      statusMessage = `Direct hit for ${shot.damage}. Remaining HP: ${engine.getState().encounter.hp}.`;
    }

    render();
  }

  // --- Click Delegation ---
  app.addEventListener('click', (event) => {
    const target = event.target.closest('[data-hotspot-id], [data-action], [data-viewport]');
    if (!target) {
      return;
    }

    // 1. Action buttons
    const action = target.dataset.action;
    if (action) {
      const result = handleAction({ action, target, engine, audio, analytics, routePath });
      if (result.handled) {
        if (result.statusMessage) statusMessage = result.statusMessage;
        if (result.needsRender) render();
        return;
      }
    }

    // 2. Hotspot buttons
    const hotspotId = target.dataset.hotspotId;
    if (hotspotId) {
      const result = handleHotspotClick({ hotspotId, routePath, engine, analytics, audio });
      if (result.handled) {
        if (result.statusMessage) statusMessage = result.statusMessage;
        if (result.lockedHotspotId) {
          lockedHotspotId = result.lockedHotspotId;
          if (lockedHotspotTimer) window.clearTimeout(lockedHotspotTimer);
          lockedHotspotTimer = window.setTimeout(() => {
            lockedHotspotId = null;
            render();
          }, 380);
        } else {
          lockedHotspotId = null;
        }
        if (result.redirectTo) {
          navigate(result.redirectTo);
        } else if (result.needsRender) {
          render();
        }
        return;
      }
    }

    // 3. Viewport shots
    if (target.dataset.viewport !== undefined) {
      handleViewportShot(event);
    }
  });

  // --- Form Delegation ---
  app.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const formType = form.dataset.form;
    if (!formType) {
      return;
    }

    event.preventDefault();

    const result = await handleFormSubmit({
      formType,
      form,
      routePath,
      engine,
      contactService,
      analytics,
      audio
    });

    if (result.statusMessage) statusMessage = result.statusMessage;
    if (result.puzzleStatus) puzzleStatus = result.puzzleStatus;
    if (result.contactStatus) contactStatus = result.contactStatus;
    if (result.needsRender) render();
  });

  // --- Animation Loop ---
  function animationLoop(timestamp) {
    const state = engine.getState();
    if (state.encounter.activeId) {
      const encounter = getEncounter(state.encounter.activeId);
      if (encounter) {
        const frameDuration = 1000 / encounter.fps;
        if (timestamp - lastFrameAt >= frameDuration) {
          frameIndex = (frameIndex + 1) % encounter.frames.length;
          lastFrameAt = timestamp;
          render();
        }
      }
    } else {
      frameIndex = 0;
    }

    requestAnimationFrame(animationLoop);
  }

  render();
  requestAnimationFrame(animationLoop);
}

bootstrap();
