import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Calendar from 'primevue/calendar';

import 'primevue/resources/themes/lara-light-purple/theme.css'; //theme
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).use(router)
  .use(store)
  .use(PrimeVue)
  .component('Button', Button)
  .component('Password', Password)
  .component('Calendar', Calendar)
  .component('InputText', InputText)
  .component('Dialog', Dialog)
  .mount('#app')
