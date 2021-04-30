import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faShoppingBasket, faUtensils, faDollarSign, faCamera, faTimes, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Dashboard from "@/components/Dashboard";
import UpdateOrder from "@/components/UpdateOrder";
import './styles/main.scss'
import PlaceOrder from "@/components/PlaceOrder";

library.add({
    faShoppingBasket,
    faUtensils,
    faDollarSign,
    faCamera,
    faTimes,
    faSpinner
})

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        loggedIn: false
    },
    mutations: {
        loggedIn (state) {
            state.count++
        }
    }
})

const routes = [
    {path: '/', component: Login, name: 'Login'},
    {path: '/signup', component: SignUp, name: 'Sign Up'},
    {path: '/dashboard', component: Dashboard, name: 'Dashboard'},
    {path: '/delivery', component: PlaceOrder, name: 'Place Order'},
    {path: '/:id', component: UpdateOrder, name: 'UpdateOrder',}
]
const router = new VueRouter({
    routes
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
