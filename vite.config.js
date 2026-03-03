import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        archive: 'archive.html',
        armory: 'armory.html',
        comms: 'comms.html',
        devlog: 'devlog.html'
      }
    }
  }
});
