// import checktoken from "../utils/checktoken"
// import jwtdecode from "jwt-decode"
export default async function({
    app,
    store,
    redirect
}) {
    if (app.context.route.query.token) {
        app.$cookies.set("inapows", app.context.route.query.token, {
            path: "/",
            maxAge: 60 * 60 * 24
        });
    } else {

        if (!app.$cookies.get('inapows')) {
            if (app.$cookies.get('users')) {
                redirect(`/sso?token=${app.$cookies.get('users')}&redirect=inapows`)
            } else {
                redirect('/?redirect=inapows')
            }
        }
    }

}