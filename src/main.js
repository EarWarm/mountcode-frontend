import _ from "lodash";
import axios from "axios";

import {createApp} from 'vue'
import {VueReCaptcha} from "vue-recaptcha-v3";
import {createPinia} from 'pinia';
import ToastPlugin, {useToast} from 'vue-toast-notification';
import mitt from "mitt";

import {config} from "{src}/config";
import {router} from "{src}/router";
import App from '{src}/App.vue'
import {useAuthStore} from "{modules}/auth/stores/authStore";
import authController from "{modules}/auth/controllers/authController";
import userController from "{modules}/user/controllers/userController";

window._ = _;
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Accept"] = "application/json";
window.axios.defaults.withCredentials = true;
window.config = config;


const pinia = createPinia();

let toastOptions = {
    position: 'top-right',
    duration: 6000
};
let app = createApp(App);
app.use(router)
app.use(pinia)
app.use(ToastPlugin, toastOptions)
app.use(VueReCaptcha, {
    siteKey: '6Lef5TAiAAAAAKWGmiQm-Ya4rgDHGRNfFDeQAph2',
    loaderOptions: {
        autoHideBadge: true
    }
});
app.config.globalProperties.emitter = mitt();
window.emitter = app.config.globalProperties.emitter;

authController.loadLocalTokens();
await userController.loadUser();

app.mount('#app');

let toast = useToast(toastOptions);
window.axios.interceptors.response.use(response => {
    if (response.data.message !== undefined) {
        toast[response.data.status === true ? 'success' : 'error'](response.data.message)
    }
    return Promise.resolve(response);
}, error => {
    if (error.response.data.errors !== undefined) {
        Object
            .entries(error.response.data.errors)
            .map(value => toast.error(value[1][0]))
    }
    if (error.response.status === 401) {
        useAuthStore().logout();
    }
    return Promise.reject(error);
});
