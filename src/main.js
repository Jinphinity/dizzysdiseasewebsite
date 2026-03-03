import { LocalProfileRepository } from './adapters/storage/local-profile-repository.js';
import { createAnalytics } from './application/create-analytics.js';
import { createAudio } from './application/create-audio.js';
import { createContactService } from './application/create-contact-service.js';
import { createGameEngine } from './application/create-game-engine.js';
import { executeHotspotEffects } from './application/execute-hotspot-effects.js';
import { areRequirementsMet } from './application/requirements.js';
import { resolveEncounterShot } from './application/resolve-encounter-shot.js';
import { getEncounter } from './content/encounters.js';
import { getMerchantItem, MERCHANT_CATALOG } from './content/merchant-catalog.js';
import { ROUTE_ORDER, getRoute } from './content/routes.js';
import { hrefToRoute, routeToHref } from './content/route-hrefs.js';
import './styles/base.css';
import { renderApp } from './ui/render-app.js';

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
      isMuted: audio.isMuted()
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

  app.addEventListener('click', (event) => {
    const target = event.target.closest('[data-hotspot-id], [data-action], [data-viewport]');
    if (!target) {
      return;
    }

    const action = target.dataset.action;
    if (action) {
      switch (action) {
        case 'toggle-mute':
          audio.toggleMute();
          statusMessage = audio.isMuted() ? 'Audio muted.' : 'Audio enabled.';
          render();
          return;
        case 'reset-save':
          window.localStorage.clear();
          window.location.reload();
          return;
        case 'buy': {
          const item = getMerchantItem(target.dataset.itemId);
          if (!item) {
            return;
          }
          const result = engine.buyItem(item);
          if (result.ok) {
            analytics.track('merchant_buy', { itemId: item.id, cost: item.cost });
            statusMessage = `Purchased ${item.name} for ${item.cost} loot.`;
          } else {
            statusMessage = 'Purchase failed: insufficient loot.';
          }
          render();
          return;
        }
        case 'sell': {
          const item = getMerchantItem(target.dataset.itemId);
          if (!item) {
            return;
          }
          const result = engine.sellItem(item);
          if (result.ok) {
            analytics.track('merchant_sell', { itemId: item.id, sell: item.sell });
            statusMessage = `Sold ${item.name} for ${item.sell} loot.`;
          } else {
            statusMessage = 'Sell failed: item not in inventory.';
          }
          render();
          return;
        }
        default:
          return;
      }
    }

    const hotspotId = target.dataset.hotspotId;
    if (hotspotId) {
      const route = getRoute(routePath);
      const hotspot = route.hotspots.find((item) => item.id === hotspotId);
      if (!hotspot) {
        return;
      }

      if (!areRequirementsMet(engine.getState(), hotspot.requires)) {
        statusMessage = 'This interaction is locked. Complete current objective first.';
        render();
        return;
      }

      const effectResult = executeHotspotEffects({ engine, effects: hotspot.effects });
      analytics.track('hotspot_click', { route: routePath, hotspotId });
      statusMessage = `Interaction complete: ${hotspot.label}.`;

      if (effectResult.redirectTo) {
        navigate(effectResult.redirectTo);
      } else {
        render();
      }
      return;
    }

    if (target.dataset.viewport !== undefined) {
      handleViewportShot(event);
    }
  });

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

    if (formType === 'terminal') {
      const code = form.elements.code?.value ?? '';
      const result = engine.attemptTerminalUnlock(code);

      if (result.unlocked) {
        puzzleStatus = { ok: true, message: 'Terminal unlocked. Bonus operations content enabled.' };
        statusMessage = 'Puzzle solved using archive intelligence.';
        analytics.track('puzzle_unlock', { route: routePath });
        audio.play('success');
      } else {
        puzzleStatus = { ok: false, message: 'Incorrect keyphrase. Search archive logs for the access term.' };
        statusMessage = 'Terminal remains locked.';
        analytics.track('puzzle_attempt_failed', { route: routePath, reason: result.reason });
        audio.play('miss');
      }

      render();
      return;
    }

    if (formType === 'contact') {
      const route = getRoute(routePath);
      const payload = {
        name: form.elements.name?.value ?? '',
        email: form.elements.email?.value ?? '',
        message: form.elements.message?.value ?? '',
        route: routePath
      };

      const result = await contactService.submit({
        endpoint: route.contact?.formEndpoint,
        payload
      });

      contactStatus = {
        ok: result.ok,
        message: result.message
      };

      if (result.ok) {
        analytics.track('contact_submit', { route: routePath, mode: result.mode });
        statusMessage = 'Contact transmission processed.';
        audio.play('success');
        form.reset();
      } else {
        statusMessage = 'Contact transmission failed.';
        audio.play('miss');
      }

      render();
    }
  });

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
