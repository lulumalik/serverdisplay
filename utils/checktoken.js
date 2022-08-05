import jwtDecode from 'jwt-decode';

const check = async function(app, store, config) {
    // Check user
    try {
        var token = app.$cookies.get('users'),
            jwt = jwtDecode(token);
        // JWT Valid
        // console.log(jwt)
        if (jwt) {
            store.commit("users/mutationUsers", {
                key: 'isToken',
                value: true
            });
            if (config) {
                config.headers['x-access-token'] = token
            } else {

            }
            // config ?  : ''

        } else {
            // JWT invalid delete Token
            app.$cookies.remove('users')
            store.commit("users/mutationUsers", {
                key: 'isToken',
                value: false
            });
        }
    } catch {
        // catcn all error
        app.$cookies.remove('users')
        store.commit("users/mutationUsers", {
            key: 'isToken',
            value: false
        });
    }
}

export default check