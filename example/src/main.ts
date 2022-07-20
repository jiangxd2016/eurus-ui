import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from 'virtual:generated-pages';
import { ELoading, create } from 'eurus-ui';

import App from './App.vue';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

import 'eurus-ui/dist/css/base.css';
import 'eurus-ui/dist/style.css';
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
const Ui = create({
  components: [
    ELoading
  ]
});
app.use(Ui);
app.use(router);
app.mount('#app');
