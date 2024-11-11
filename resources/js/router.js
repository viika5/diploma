import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', component: () => import('./components/Get'), name: 'user.index'},
        // { path: '/get', component: () => import('./components/Get'), name: 'get.index'},
        { path: '/login', component: () => import('./components/Login'), name: 'user.login'},
        { path: '/registration', component: () => import('./components/Registration'), name: 'user.registration'},
        { path: '/personal', component: () => import('./components/Personal'), name: 'user.personal'},
        { path: '/test', component: () => import('./components/Test'), name: 'test'},
        { path: '*', component: () => import('./components/NotFound'), name: 'error'},
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf');

    if (!token){
        if (to.name === 'user.login' || to.name === 'user.registration'){
            return next()
        } else {
            return next({name: 'user.login'})
        }

    }

    if (to.name === 'user.login' || to.name === 'user.registration' && token){
        return next({name: 'user.personal'})
    }

    next()
})

export default router
