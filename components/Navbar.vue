<template>
  <div class="py-2 px-6 bg-black flex w-full items-center shadow-md">
    <div class="flex-grow flex items-center space-x-4 cursor-pointer" @click="$router.push('/display')">
      <img src="/bmkglogowht-01.png" alt="bmkg" class="w-10" />
      <div class="flex-grow text-white">
        <div style="font-size: 22px" class="font-semibold">
          BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
        </div>
        <div class="text-xs kaushan">
          Cepat, Tepat, Akurat, Luas, dan Mudah Dipahami
        </div>
      </div>
    </div>
    <div class="flex space-x-4 items-center">
      <DisplaySetting class="relative top-1" v-if="$route.name == 'display-create' && $parent.showSetting" />
      <DisplaySetting class="relative top-1" v-else-if="$route.name == 'display-createrequest' && $parent.showSetting" />
      <button v-else @click="createDisplay" class="
          bg-blue-500
          border
          shadow
          px-6
          py-2
          text-white
          font-semibold
          rounded-full
          text-xs
        ">
        Create Display
      </button>
      <button @click="logout" class="
          bg-red-500
          border
          shadow
          px-6
          py-2
          text-white
          font-semibold
          rounded-full
          text-xs
        ">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  methods: {
    createDisplay() {
      if (jwtDecode(this.$cookies.get('users')).role.name == 'Admin') {

        this.$router.push('/display/create')
      } else {

        this.$router.push('/display/createrequest')
      }
    },
    logout() {
      if (jwtDecode(this.$cookies.get('users')).role.name == 'Admin') {
        this.$cookies.remove('users')

        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } else {
        this.$cookies.remove('users')

        setTimeout(() => {
          this.$router.push('/upt')
        }, 1000)
      }

    },
  },
}
</script>

<style></style>