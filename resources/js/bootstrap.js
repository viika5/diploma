import router from "./router";


window._ = require('lodash');

try {
    require('bootstrap');
} catch (e) {}

function UserException (message) {
    this.message = message;
    this.name = "UserException";
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.withCredentials = true;

window.axios.interceptors.response.use({}, err => {
    if([500, 403, 401, 422].includes(err.response.status)) {
        throw new UserException().message = err.response;
    }

    if (err.response.status === 401 || err.response.status === 419){
        const token = localStorage.getItem("x_xsrf");
        if (token){
            localStorage.removeItem("x_xsrf")
        }
        router.push({name: 'user.login'})
    }
})

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
