// import checktoken from "../utils/checktoken"
import jwtdecode from "jwt-decode"
export default async function ({
    app,
    store,
    redirect,
    route
}) {

    let token = app.$cookies.get('users')
    let decode = jwtdecode(token)
    if (!app.$cookies.get('users')) {
        redirect('/admin')
    } else {
        if (decode.role.name == 'Admin') {
            //   
        } else {

            if (route.query && route.query.id) {
                // 
            } else {
                redirect('/display')
            }
        }

        if (decode.exp < Date.now() / 1000) {
            redirect('/')
        }
    }

}