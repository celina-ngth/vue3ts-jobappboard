import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import fr from './locale/fr.json'
import router from './router'

const i18n = createI18n({
  locale: 'fr',
  messages: {
    fr,
  }
})

const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .mount('#app')
