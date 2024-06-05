/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import VueTheMask from 'vue-the-mask';

export function registerPlugins(app) {
  app.use(vuetify)
  app.use(VueTheMask)
}
