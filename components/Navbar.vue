<template>
  <div class="py-2 px-6 bg-white flex w-full items-center shadow-md">
    <div class="flex-grow"><img src="/bmkg.png" class="w-10" /></div>
    <div class="flex space-x-4 items-center">
      <DisplaySetting v-if="$route.name == 'display-create'" />
      <button v-else
        @click="$router.push('/display/create')"
        class="
          bg-blue-500
          border
          shadow
          px-6
          py-2
          text-white
          font-semibold
          rounded
          text-xs
        "
      >
        Create Display
      </button>
      <button
        @click="logout"
        class="
          bg-red-500
          border
          shadow
          px-6
          py-2
          text-white
          font-semibold
          rounded
          text-xs
        "
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$cookies.remove("users")
      setTimeout(() => {
        this.$router.push("/")
      }, 1000)
    }
  }
}
</script>

<style>
</style>