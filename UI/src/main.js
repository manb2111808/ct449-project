import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import "@fortawesome/fontawesome-free/css/all.min.css";

import jQuery from 'jquery'; //May not needed
import router from "@/router";

createApp(App).use(router).use(bootstrap).use(jQuery).mount('#app')
