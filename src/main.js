import { createGameEngine } from './application/create-game-engine.js';
import { LocalProfileRepository } from './adapters/storage/local-profile-repository.js';
import { renderShell } from './ui/render-shell.js';
import './styles/base.css';

async function bootstrap() {
  const app = document.getElementById('app');
  const repository = new LocalProfileRepository();
  const engine = await createGameEngine({ repository });

  function render() {
    renderShell(app, engine.getState());
  }

  app.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;

    if (!action) {
      return;
    }

    switch (action) {
      case 'pickup':
        engine.pickupWeapon({ encounterId: 'intro_zombie', encounterHp: 100 });
        break;
      case 'reward':
        engine.completeEncounter({ encounterId: 'intro_zombie', rewardLoot: 25 });
        break;
      case 'buy':
        engine.buyItem({ id: 'ammo_pack', cost: 20 });
        break;
      case 'sell':
        engine.sellItem({ id: 'ammo_pack', sell: 10 });
        break;
      case 'clue':
        engine.discoverClue({ clueKey: 'archiveKeyphrase', value: 'silent host' });
        break;
      case 'unlock':
        engine.attemptTerminalUnlock('silent host');
        break;
      default:
        break;
    }

    render();
  });

  render();
}

bootstrap();
