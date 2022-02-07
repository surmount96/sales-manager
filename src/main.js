import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datepicker from 'vue3-datepicker';
import 'remixicon/fonts/remixicon.css'
import VueFinalModal from 'vue-final-modal'
import ApexCharts from 'apexcharts'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import "vue-select/dist/vue-select.css";
import Toaster from '@meforma/vue-toaster';
import gAuth from 'vue3-google-auth';
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import VueNumerals from "vue-numerals"
import moment from "moment";
import catcher from "@/mixins/catcher";
const $gAuth = gAuth.createGAuth({
  clientId: "890128727784-3m5626fk11htatajlv536oa68qfafov7.apps.googleusercontent.com",
//   scope: YOUR_SCOPE,
//   prompt: YOUR_PROMPT,
});

const app = createApp(App);
app.component('Datepicker',Datepicker)
// app.component('VueSelect',VueSelect)
app.use(ElementPlus)
app.mixin(catcher)
app.use($gAuth)
app.use(VueNumerals);
app.config.globalProperties.$filters = {
    convertMonth: function (value){
        if (!value) return '';
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        return months[parseInt(value-1)];
    },
    convertFullMonth: function (value){
        if (!value) return '';
        const months = [ "January", "Febuary", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

        return months[parseInt(value)];
    },
    convertDate: function (value){
        if (!value) return '';
        return moment(value).format("MMM Do YYYY");
    }
}

app.use(VueFinalModal()).use(store).use(router).use(Toaster,{
    position: 'top-right'
}).mount('#app')
