<template>
  <div class="h-screen w-screen bg md:flex items-center justify-center">
    <div class="
        flex-grow
        p-4
        w-full
        md:w-1/2 md:flex
        items-center
        md:p-12
        lg:p-32
        h-full
        md:h-screen
        text-gray-800
        

      ">
      <form @submit.prevent="loginFunc" class="w-full bg-white w-11/12 md:w-5/12 p-6 relative top-24 md:top-0 md:p-12 rounded mx-auto">
        <div class="
            md:text-4xl
            font-semibold
            text-center
          ">
          UPT
        </div>

        <div class="uppercase text-center 
            mb-6
            md:mb-12">
          <small>login server display 2023</small>
        </div>
        <div class="mb-6">
          <div class="py-2">Username</div>
          <input v-model="login.username" placeholder="Username"
            class=" form-input shadow-md w-full rounded text-gray-800" />
        </div>
        <div class="mb-6">
          <div class="py-2">Password</div>
          <input v-model="login.password" placeholder="Password" type="password"
            class="mb-4 form-input shadow-md w-full rounded text-gray-800" />
        </div>
        <div>
          <input v-if="!loading" type="submit" value="Submit" class="
              text-center
              font-semibold
              cursor-pointer
              text-white
              bg-blue-500
              w-full
              form-input
              rounded
              shadow-md
            " />
          <div v-else class="
              text-center
              font-semibold
              cursor-pointer
              text-white
              bg-blue-500
              w-full
              form-input
              rounded
              shadow-md
            ">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"
              class="mx-auto animate-spin">
              <path fill="white"
                d="M14 22c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-2-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-22 2c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-9c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-14-14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
            </svg>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.bg {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 300% 300%;
  background-image: linear-gradient(-45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%);
  animation: AnimateBG 20s ease infinite;
}

@keyframes AnimateBG {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>


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
  created() {
    // this.$router.push("/login?redirect=inapows");
    if (this.$cookies.get('users')) {
      this.$router.push('/display')
    }
  },
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
      this.loading = true
      this.$axios
        .$post(`user/login`, this.login)
        .then((res) => {
          this.loading = false
          this.$cookies.set('users', res.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          window.open('/display', "_self")
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          alert('error')
        })
    },
  },
}
</script>