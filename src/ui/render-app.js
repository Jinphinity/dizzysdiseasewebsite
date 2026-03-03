import { areRequirementsMet } from '../application/requirements.js';
import { routeToHref } from '../content/route-hrefs.js';

function renderHotspots({ route, state }) {
  return route.hotspots
    .filter((hotspot) => areRequirementsMet(state, hotspot.requires))
    .map(
      (hotspot) => `
        <button
          class="hotspot"
          data-hotspot-id="${hotspot.id}"
          aria-label="${hotspot.label}"
          title="${hotspot.label}"
          style="left:${hotspot.x}%;top:${hotspot.y}%;width:${hotspot.width}%;height:${hotspot.height}%;"
        ></button>
      `
    )
    .join('');
}

function renderMerchant({ catalog, state }) {
  return `
    <section class="panel merchant">
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
    <section class="panel contact">
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
    <section class="panel terminal">
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
  isMuted
}) {
  const activeEncounter = Boolean(state.encounter.activeId);

  target.innerHTML = `
    <div class="page-bg"></div>
    <main class="app-shell">
      <header class="topbar">
        <div>
          <h1>Dizzy's Disease: Hospitality Ops Experience</h1>
          <p>${route.assignmentLabel} - ${route.title}</p>
        </div>
        <div class="topbar-actions">
          <button data-action="toggle-mute">Audio: ${isMuted ? 'Off' : 'On'}</button>
          <button data-action="reset-save">Reset Save</button>
        </div>
      </header>

      <nav class="route-nav" aria-label="Primary">
        ${routeOrder
          .map(
            (path) => `
              <a href="${routeToHref(path)}" class="${path === route.path ? 'active' : ''}">${
                path === '/' ? 'home' : path.slice(1)
              }</a>
            `
          )
          .join('')}
      </nav>

      <section class="layout">
        <article class="viewport-wrap">
          <div class="viewport" data-viewport>
            <img class="room-image" src="${route.heroImage}" alt="${route.title} environment" />
            ${renderHotspots({ route, state })}
            ${
              activeEncounter
                ? `<img class="encounter" src="${encounterFrameSrc}" alt="active encounter target" />`
                : ''
            }
          </div>
          <div class="viewport-notes">
            ${route.infoBlocks
              .map(
                (block) => `
                  <section>
                    <h3>${block.heading}</h3>
                    <p>${block.body}</p>
                  </section>
                `
              )
              .join('')}
          </div>
        </article>

        <aside class="hud">
          <section class="panel stats">
            <h3>MFD Status</h3>
            <p>Health: ${state.player.health}</p>
            <p>Loot: ${state.player.loot}</p>
            <p>Weapon Equipped: ${state.progress.weaponEquipped ? 'Yes' : 'No'}</p>
            <p>Encounter HP: ${state.encounter.hp}</p>
            <p>Terminal: ${state.progress.terminalUnlocked ? 'Unlocked' : 'Locked'}</p>
            <p>Inventory: ${state.player.inventory.join(', ') || 'none'}</p>
          </section>

          ${route.path === '/armory' ? renderMerchant({ catalog, state }) : ''}
          ${route.path === '/comms' ? renderTerminal({ state, puzzleStatus }) : ''}
          ${route.path === '/comms' ? renderContact({ route, contactStatus }) : ''}
          ${route.path === '/devlog' ? renderBlog(route) : ''}
        </aside>
      </section>

      <footer class="log-bar" aria-live="polite">${statusMessage ?? 'Awaiting interaction...'}</footer>
    </main>
  `;
}
