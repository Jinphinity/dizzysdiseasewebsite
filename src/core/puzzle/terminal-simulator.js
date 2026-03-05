/**
 * Retro OS Terminal Simulator — Backend Logic.
 * Provides the command parser and file system simulation for
 * the diegetic computer hacking screen.
 *
 * The OS has a simple virtual file system and accepts text commands.
 * It tracks which files have been read and which puzzles have been solved.
 */

const VIRTUAL_FILES = {
    '/home/readme.txt': 'Welcome to DD-OS v2.1.4\nType HELP for available commands.\nType LS to list files.\nType CAT <filename> to read a file.',
    '/home/memo_vasquez.txt': 'FROM: Dr. Vasquez\nTO: All Lab Staff\nSUBJECT: Containment Protocol\n\nThe NV-013 compound is exhibiting unexpected neural plasticity.\nAll subjects in wing C must be isolated immediately.\nThe terminal override keyphrase has been changed to: silent host\n\nDo NOT share this keyphrase over unsecured channels.',
    '/home/incident_log.txt': '=== INCIDENT LOG ===\n03/01 - Subject 7 breached containment. 2 casualties.\n03/02 - Power failure in sublevel B. Backup generators online.\n03/03 - Multiple subjects exhibiting coordinated behavior. Unprecedented.\n03/04 - Facility lockdown initiated. All exits sealed.',
    '/logs/access_log.dat': 'ACCESS DENIED — ENCRYPTED\nRequires signal_decoder item to decrypt.',
    '/logs/experiment_049.dat': 'EXPERIMENT 049 — CLASSIFIED\nNeural virus strain NV-013 binds to synaptic receptors.\nMutation rate: 340% above baseline.\nSubjects retain motor function but lose higher cognition.\nTime to full conversion: 6-14 hours.\n\n>>> ANTIVENOM SYNTHESIS POSSIBLE <<<\n>>> Requires DNA sequence from live sample <<<',
    '/system/passwd': 'root:$6$rounds=5000$salt$hashed_password\nadmin:$6$rounds=5000$salt2$hashed_password2\nguest:no_password_required',
};

const HELP_TEXT = `DD-OS v2.1.4 — AVAILABLE COMMANDS:
  HELP          Show this help text
  LS [path]     List files in directory
  CAT <file>    Read a file
  WHOAMI        Show current user
  CLEAR         Clear the terminal
  DECRYPT <file> Attempt to decrypt an encrypted file (requires signal_decoder)
  UNLOCK <code> Submit a keyphrase to unlock the security terminal
  EXIT          Disconnect from terminal`;

export function createTerminalSimulator() {
    const history = [];
    const readFiles = new Set();
    let isUnlocked = false;

    function getDirectoryListing(path = '/home') {
        const prefix = path.endsWith('/') ? path : path + '/';
        const entries = Object.keys(VIRTUAL_FILES)
            .filter(f => f.startsWith(prefix))
            .map(f => {
                const relative = f.slice(prefix.length);
                // Only show immediate children
                const parts = relative.split('/');
                return parts[0] + (parts.length > 1 ? '/' : '');
            });
        return [...new Set(entries)];
    }

    function executeCommand(input, playerInventory = []) {
        const trimmed = input.trim();
        const parts = trimmed.split(/\s+/);
        const cmd = (parts[0] || '').toUpperCase();
        const arg = parts.slice(1).join(' ');

        const entry = { input: trimmed, output: '', timestamp: Date.now() };

        switch (cmd) {
            case 'HELP':
                entry.output = HELP_TEXT;
                break;

            case 'LS': {
                const dir = arg || '/home';
                const listing = getDirectoryListing(dir);
                entry.output = listing.length > 0
                    ? listing.join('\n')
                    : `ls: ${dir}: No such directory`;
                break;
            }

            case 'CAT': {
                if (!arg) {
                    entry.output = 'Usage: CAT <filename>';
                    break;
                }
                // Try exact path, then /home/ prefix, then /logs/ prefix
                const candidates = [arg, `/home/${arg}`, `/logs/${arg}`, `/system/${arg}`];
                const match = candidates.find(c => VIRTUAL_FILES[c]);
                if (match) {
                    const content = VIRTUAL_FILES[match];
                    if (content.startsWith('ACCESS DENIED')) {
                        entry.output = content;
                        entry.requiresItem = 'signal_decoder';
                    } else {
                        entry.output = content;
                        readFiles.add(match);
                    }
                } else {
                    entry.output = `cat: ${arg}: No such file`;
                }
                break;
            }

            case 'DECRYPT': {
                if (!arg) {
                    entry.output = 'Usage: DECRYPT <filename>';
                    break;
                }
                const candidates = [arg, `/home/${arg}`, `/logs/${arg}`];
                const match = candidates.find(c => VIRTUAL_FILES[c]);
                if (!match) {
                    entry.output = `decrypt: ${arg}: No such file`;
                } else if (playerInventory.includes('signal_decoder')) {
                    entry.output = `Decrypting ${match}...\n\n${VIRTUAL_FILES[match].replace('ACCESS DENIED — ENCRYPTED\nRequires signal_decoder item to decrypt.', '[DECRYPTED SUCCESSFULLY]')}`;
                    readFiles.add(match);
                } else {
                    entry.output = 'DECRYPTION FAILED — signal_decoder not found in inventory.';
                }
                break;
            }

            case 'WHOAMI':
                entry.output = 'guest@dd-os (no elevated privileges)';
                break;

            case 'CLEAR':
                history.length = 0;
                entry.output = '';
                break;

            case 'UNLOCK': {
                if (!arg) {
                    entry.output = 'Usage: UNLOCK <keyphrase>';
                    break;
                }
                const normalized = arg.trim().toLowerCase().replace(/\s+/g, ' ');
                if (normalized === 'silent host') {
                    isUnlocked = true;
                    entry.output = '>>> ACCESS GRANTED <<<\nSecurity terminal unlocked. Bonus content now available.';
                    entry.unlocked = true;
                } else {
                    entry.output = '>>> ACCESS DENIED <<<\nIncorrect keyphrase. Search facility records for the override code.';
                }
                break;
            }

            case 'EXIT':
                entry.output = 'Disconnecting...';
                entry.shouldClose = true;
                break;

            default:
                entry.output = `${cmd}: command not found. Type HELP for available commands.`;
                break;
        }

        history.push(entry);
        return entry;
    }

    return {
        executeCommand,
        getHistory() { return [...history]; },
        getReadFiles() { return [...readFiles]; },
        isUnlocked() { return isUnlocked; },
        reset() {
            history.length = 0;
            readFiles.clear();
            isUnlocked = false;
        }
    };
}
