// vite.config.js
export default {
   build: {
      outDir: 'dist', // Output folder for the built files
      rollupOptions: {
         input: 'index.html' // Make sure index.html is included in the build
      }
   },
   server: {
      open: true, // Automatically open the app in the browser on start
   }
}
