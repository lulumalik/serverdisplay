<template>
  <div class="h-screen w-screen md:flex items-center justify-center">
    <div
      class="
        flex-grow
        md:w-1/2
        flex
        items-start
        relative
        justify-center
        h-screen
      "
      style="background: url('/loginbg1.svg'); background-size: cover"
    >
      <img
        src="/loginbg2.svg"
        alt="img"
        class="absolute top-8 -right-16 w-96  z-50"
      />
      <!-- <img src="/inapows/logo/black.png" class="w-6 md:w-12 fixed top-6 left-6" />
      <div class="p-2.5 mb-6 md:p-12">
        <div>
          <img alt="logo" class="w-32 md:w-56 mx-auto" src="inapows.png" />
        </div>
        <div class="text-md md:text-2xl leading-relaxed font-semibold mt-4 md:mt-12">
          <div class="text-center mb-3">Indonesia - Port Weather Services</div>
          <div class="text-xs text-center">Sistem informasi cuaca
          pelabuhan - jalur pelayaran terintegrasi melalui layanan port to port.</div>
        </div>
        <div style="font-size:8px" class=" absolute bottom-3 md:-bottom-32 right-3">
          Versi beta 0.1
        </div>
      </div> -->
    </div>
    <div
      class="
        flex-grow
        p-4
        md:w-1/2 md:flex
        items-center
        md:p-12
        lg:p-32
        h-full
        md:h-screen
        text-gray-800
        bg-login
      "
    >
      <form @submit.prevent="loginFunc" class="w-full">
        <div
          class="
            border-b-2 border-gray-800
            pb-2
            md:text-xl
            font-semibold
            mb-6
            md:mb-12
          "
        >
          Log in
        </div>
        <div class="mb-6">
          <div class="py-2">Username</div>
          <input
            v-model="login.username"
            placeholder="Username"
            class="md:mb-4 form-input shadow-md w-full rounded text-gray-800"
          />
        </div>
        <div class="mb-6 md:mb-12">
          <div class="py-2">Password</div>
          <input
            v-model="login.password"
            placeholder="Password"
            type="password"
            class="mb-4 form-input shadow-md w-full rounded text-gray-800"
          />
        </div>
        <div>
          <input
            v-if="!loading"
            type="submit"
            value="Submit"
            class="
              text-center
              font-semibold
              cursor-pointer
              text-white
              bg-blue-500
              w-full
              form-input
              rounded
              shadow-md
            "
          />
          <div
            v-else
            class="
              text-center
              font-semibold
              cursor-pointer
              text-white
              bg-blue-500
              w-full
              form-input
              rounded
              shadow-md
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              class="mx-auto animate-spin"
            >
              <path
                fill="white"
                d="M14 22c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-2-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-22 2c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-9c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-14-14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z"
              />
            </svg>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  //   beforeMount() {
  //     this.$router.push("/login?redirect=inapows");
  //   },
  methods: {
    serialize(obj) {
      var str = []
      for (var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      return str.join('&')
    },
    loginFunc() {
      var query = this.$route.query
      this.loading = true
      this.$axios
        .$post(`user/login`, this.login)
        .then((res) => {
          this.loading = false
          // clearTimeout(timeout);
          // if (res.data.status == "OK") {
          // var data = res.data.data;
          this.$cookies.set('users', res.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          this.$router.push('/template')
          // this.$router.push(`/${query.redirect}`)
          // this.$router.push(
          //   `/?token=${data.token}&redirect=${query.redirect}`
          // );
          // window.location.href = data.redirect
          //   ? `/?token=${data.token}&redirect=${query.redirect}`
          //   : `/sso?token=${data.token}`;
          // }
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          alert('error')
          // this.onLogin = false;
          // clearTimeout(timeout);
          // this.modalOpen = true;
        })
    },
  },
}
</script>