export function createAudio() {
  let muted = false;
  let context = null;
  let ambientSource = null;

  function ensureContext() {
    if (!context) {
      const AudioContextRef = window.AudioContext || window.webkitAudioContext;
      if (AudioContextRef) {
        context = new AudioContextRef();
      }
    }

    return context;
  }

  function playTone({ frequency = 440, durationMs = 120, type = 'square', gain = 0.02 } = {}) {
    if (muted) {
      return;
    }

    const ctx = ensureContext();
    if (!ctx) {
      return;
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = gain;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };

    oscillator.start();
    oscillator.stop(ctx.currentTime + durationMs / 1000);
  }

  return {
    play(eventName) {
      switch (eventName) {
        case 'hit':
          playTone({ frequency: 880, durationMs: 90, type: 'square', gain: 0.03 });
          break;
        case 'miss':
          playTone({ frequency: 220, durationMs: 70, type: 'triangle', gain: 0.015 });
          break;
        case 'success':
          playTone({ frequency: 660, durationMs: 160, type: 'sine', gain: 0.02 });
          break;
        default:
          playTone({ frequency: 440, durationMs: 100, type: 'sine', gain: 0.02 });
          break;
      }
    },
    // Stub for route-based ambient audio loops. Backend team: connect to real audio files.
    playAmbient(routePath) {
      // TODO: Load and loop an ambient audio file based on route.
      // e.g. /assets/audio/amb_safehouse.ogg for '/'
      void routePath;
    },
    stopAmbient() {
      if (ambientSource) {
        ambientSource.stop();
        ambientSource = null;
      }
    },
    isMuted() {
      return muted;
    },
    toggleMute() {
      muted = !muted;
      if (muted && ambientSource) {
        ambientSource.stop();
        ambientSource = null;
      }
      return muted;
    }
  };
}
