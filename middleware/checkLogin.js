// import checktoken from "../utils/checktoken"
import jwtdecode from "jwt-decode"
export default async function({
    app,
    store,
    redirect
}) {

    if (!app.$cookies.get('users')) {
        redirect('/admin')
    } else {
        let token = app.$cookies.get('users')
        let decode = jwtdecode(token)
        if (decode.exp < Date.now() / 1000) {
            redirect('/admin')
        }
    }

}