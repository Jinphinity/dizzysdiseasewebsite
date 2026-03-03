export function renderShell(target, state) {
  target.innerHTML = `
    <main class="app-shell">
      <header class="hud">
        <strong>Dizzy's Disease MVP Core</strong>
        <span>Loot: ${state.player.loot}</span>
        <span>Inventory: ${state.player.inventory.join(', ') || 'empty'}</span>
        <span>Terminal: ${state.progress.terminalUnlocked ? 'Unlocked' : 'Locked'}</span>
      </header>
      <section class="controls">
        <button data-action="pickup">Pickup Weapon</button>
        <button data-action="reward">Complete Encounter (+25 loot)</button>
        <button data-action="buy">Buy Ammo (-20)</button>
        <button data-action="sell">Sell Ammo (+10)</button>
        <button data-action="clue">Discover Clue</button>
        <button data-action="unlock">Unlock Terminal</button>
      </section>
      <pre class="state">${JSON.stringify(state, null, 2)}</pre>
    </main>
  `;
}
