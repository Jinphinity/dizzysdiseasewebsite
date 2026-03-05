import { getHotspotLockState } from '../application/hotspot-lock-state.js';
import { routeToHref } from '../content/route-hrefs.js';

function renderHotspots({ route, state, lockedHotspotId }) {
  return route.hotspots
    .map((hotspot) => {
      const lockState = getHotspotLockState({ state, hotspot });
      const classes = [
        'hotspot',
        `hotspot--${hotspot.kind ?? 'generic'}`,
        lockState.locked ? 'hotspot--locked' : 'hotspot--unlocked',
        lockedHotspotId === hotspot.id ? 'hotspot--shake' : ''
      ]
        .filter(Boolean)
        .join(' ');

      return `
        <button
          class="${classes}"
          data-hotspot-id="${hotspot.id}"
          data-hotspot-kind="${hotspot.kind ?? 'generic'}"
          data-hotspot-locked="${lockState.locked ? 'true' : 'false'}"
          data-hotspot-label="${hotspot.label}"
          aria-label="${hotspot.label}"
          title="${hotspot.label}"
          style="left:${hotspot.x}%;top:${hotspot.y}%;width:${hotspot.width}%;height:${hotspot.height}%;"
        ></button>
      `;
    })
    .join('');
}

function renderMerchant({ catalog, state }) {
  return `
    <section class="panel panel--interactive merchant">
      <h3>Service Marketplace</h3>
      <p>Buy or sell operational tools using recovered loot currency.</p>
      <ul class="merchant-list">
        ${catalog
          .map(
            (item) => `
              <li>
                <div>
                  <strong>${item.name}</strong>
                  <p>${item.description}</p>
                  <small>Buy ${item.cost} | Sell ${item.sell}</small>
                </div>
                <div class="merchant-actions">
                  <button data-action="buy" data-item-id="${item.id}">Buy</button>
                  <button data-action="sell" data-item-id="${item.id}">Sell</button>
                </div>
              </li>
            `
          )
          .join('')}
      </ul>
      <p class="meta">Current inventory: ${state.player.inventory.join(', ') || 'none'}</p>
    </section>
  `;
}

function renderContact({ route, contactStatus }) {
  const statusMarkup =
    contactStatus && contactStatus.message
      ? `<p class="status ${contactStatus.ok ? 'ok' : 'error'}">${contactStatus.message}</p>`
      : '';

  return `
    <section class="panel panel--interactive contact">
      <h3>Contact Operations</h3>
      <p><strong>Phone:</strong> ${route.contact.phone}</p>
      <p><strong>Email:</strong> ${route.contact.email}</p>
      <p><strong>Address:</strong> ${route.contact.address}</p>
      <form data-form="contact">
        <label>
          Callsign
          <input required name="name" />
        </label>
        <label>
          Frequency
          <input required type="email" name="email" />
        </label>
        <label>
          Broadcast Content
          <textarea required name="message" rows="4"></textarea>
        </label>
        <button type="submit">Transmit Inquiry</button>
      </form>
      ${statusMarkup}
    </section>
  `;
}

function renderTerminal({ state, puzzleStatus }) {
  const statusMarkup = puzzleStatus
    ? `<p class="status ${puzzleStatus.ok ? 'ok' : 'error'}">${puzzleStatus.message}</p>`
    : '';

  return `
    <section class="panel panel--interactive terminal">
      <h3>Terminal Lock</h3>
      <p>Use the keyphrase found in archive records to unlock this terminal.</p>
      <form data-form="terminal">
        <input name="code" placeholder="Enter keyphrase" required />
        <button type="submit">Unlock</button>
      </form>
      <p>Terminal status: <strong>${state.progress.terminalUnlocked ? 'Unlocked' : 'Locked'}</strong></p>
      ${statusMarkup}
    </section>
  `;
}

function renderBlog(route) {
  const posts = route.blogPosts ?? [];

  return `
    <section class="panel blog">
      <h3>Blog Posts</h3>
      ${posts
        .map(
          (post) => `
            <article>
              <h4>${post.title}</h4>
              <time datetime="${post.date}">${post.date}</time>
              <p>${post.body}</p>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderRouteIntel(route) {
  return `
    <section class="panel route-intel">
      <h3>${route.title}</h3>
      <p>${route.subtitle ?? ''}</p>
      ${route.infoBlocks
        .map(
          (block) => `
            <article class="intel-block">
              <h4>${block.heading}</h4>
              <p>${block.body}</p>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function renderRouteModules({ route, catalog, state, puzzleStatus, contactStatus }) {
  return `
    ${route.path === '/armory' ? renderMerchant({ catalog, state }) : ''}
    ${route.path === '/comms' ? renderTerminal({ state, puzzleStatus }) : ''}
    ${route.path === '/comms' ? renderContact({ route, contactStatus }) : ''}
    ${route.path === '/devlog' ? renderBlog(route) : ''}
  `;
}

export function renderApp({
  target,
  route,
  routeOrder,
  state,
  encounterFrameSrc,
  catalog,
  statusMessage,
  puzzleStatus,
  contactStatus,
  isMuted,
  lockedHotspotId
}) {
  const activeEncounter = Boolean(state.encounter.activeId);

  target.innerHTML = `
    <div class="page-bg"></div>
    <main class="app-shell">
      <header class="topbar">
        <div class="topbar-title">
          <h1>Dizzy's Disease Interface</h1>
          <p>Meta navigation and system controls.</p>
        </div>
        <nav class="top-nav" aria-label="Primary">
          ${routeOrder
            .map(
              (path) => `
                <a href="${routeToHref(path)}" class="${path === route.path ? 'active' : ''}">
                  ${path === '/' ? 'home' : path.slice(1)}
                </a>
              `
            )
            .join('')}
        </nav>
        <div class="topbar-actions">
          <button data-action="toggle-mute">Audio: ${isMuted ? 'Off' : 'On'}</button>
          <button data-action="reset-save">Reset Save</button>
        </div>
      </header>

      <section class="game-window" aria-label="In-world game screen">
        <div class="viewport" data-viewport data-route="${route.path}">
          <img class="room-image" src="${route.heroImage}" alt="${route.title} environment" />
          ${renderHotspots({ route, state, lockedHotspotId })}
          ${
            activeEncounter
              ? `<img class="encounter" src="${encounterFrameSrc}" alt="active encounter target" />`
              : ''
          }

          <aside class="overlay overlay-left">
            <section class="panel stats">
              <h3>MFD Status</h3>
              <p>Health: ${state.player.health}</p>
              <p>Loot: ${state.player.loot}</p>
              <p>Weapon Equipped: ${state.progress.weaponEquipped ? 'Yes' : 'No'}</p>
              <p>Encounter HP: ${state.encounter.hp}</p>
              <p>Terminal: ${state.progress.terminalUnlocked ? 'Unlocked' : 'Locked'}</p>
              <p>Inventory: ${state.player.inventory.join(', ') || 'none'}</p>
            </section>
          </aside>

          <aside class="overlay overlay-right">
            ${renderRouteIntel(route)}
            ${renderRouteModules({ route, catalog, state, puzzleStatus, contactStatus })}
          </aside>

          <div class="overlay overlay-bottom" aria-live="polite">
            <p class="inworld-log">${statusMessage ?? 'Awaiting interaction...'}</p>
          </div>
        </div>
      </section>

      <footer class="meta-footer">
        <span>Assignment mapping: ${route.assignmentLabel}</span>
        <span>Location node: ${route.title}</span>
        <span>Route id: ${route.path}</span>
      </footer>
    </main>
  `;
}
