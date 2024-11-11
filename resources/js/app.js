import Vue from 'vue';
import Index from "./components/Index";
import router from "./router";
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueGoodTablePlugin from 'vue-good-table';
import VueExcelXlsx from "vue-excel-xlsx";
import 'vue-good-table/dist/vue-good-table.css'


Vue.use(VueExcelXlsx);
Vue.use(VueGoodTablePlugin);
Vue.use(Vuesax, {
    colors: {
        primary:'#5b3cc4',
        success:'rgb(23, 201, 100)',
        danger:'rgb(242, 19, 93)',
        warning:'rgb(255, 130, 0)',
        dark:'rgb(36, 33, 69)'
    }
})

require('./bootstrap');


const app = new Vue({
    el: '#app',
    components: {
        Index
    },
    router,
    mounted() {
        this.$vs.setTheme('light')
    }
});
