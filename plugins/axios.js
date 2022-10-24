import checkToken from "../utils/checktoken";
export default function({ $axios, redirect, app, store }) {
    $axios.onRequest((config) => {
        // console.log(config)
        // var token = app.$cookies.get('users');
        // console.log(config, token)
        // config.headers.Authorization = token
        checkToken(app, store, config);
    });

    // $axios.onError(async(error) => {
    // console.log(error)
    // var response =
    //   error.response && error.response.data && error.response.data.error;
    // store.commit("users/mutationUsers", {
    //   key: "errorResponse",
    //   value: response || "Something went wrong",
    // });
    // store.commit("map/mutationData", {
    //   key: "seriesInfo",
    //   value: error.response || "Something went wrong.",
    // });
    // if (response == "Bad token") {
    //   app.$cookies.remove('users')
    //   redirect("/");
    // }
    // });
}