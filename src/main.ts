import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

createApp(App).use(router)
  .use(store)
  .use(PrimeVue)
  .use(ToastService)
  .use(VueApexCharts)
  .component('Toast', Toast)
  .component('Button', Button)
  .component('Password', Password)
  .component('Calendar', Calendar)
  .component('Checkbox', Checkbox)
  .component('InputText', InputText)
  .component('Dialog', Dialog)
  .mount('#app')
