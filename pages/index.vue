<template>
  <div class="h-screen w-screen md:flex items-center justify-center">
    <div class="
        flex-grow
        md:w-1/2
        flex
        items-start
        relative
        justify-center
        h-screen
      ">
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="
        flex-grow
        p-8
        m-4
        md:m-0
        md:w-1/2 md:flex
        items-center
        md:p-12
        lg:p-32
        w-72
        mx-auto
        left-0
        right-0
        md:h-screen
        text-gray-800
        absolute
        top-24
        md:top-0
        md:relative
        bg-white
      ">
      <form @submit.prevent="loginFunc" class="w-full">
        <div class="
            md:text-4xl
            font-semibold
            text-center
          ">
          ADMIN
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
.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;


}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;

}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}



@keyframes animate {

  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
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
      var query = this.$route.query
      this.loading = true
      this.$axios
        .$post(`user/login`, this.login)
        .then((res) => {
          this.loading = false
          this.$cookies.set('users', res.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          this.$router.push('/display')
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