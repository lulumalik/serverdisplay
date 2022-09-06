<template>
  <div>
    <OverlayLoading v-if="loading" />
    <GalleryDisplay :withrouter="true" @finishloading="finishing" />
  </div>
</template>

<script>
// import { io } from 'socket.io-client'
export default {
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    process.nextTick(() => {
      // const socket = io('ws://example.com/my-namespace', {
      //   reconnectionDelayMax: 10000,
      //   auth: {
      //     token: '123',
      //   },
      //   query: {
      //     'my-key': 'my-value',
      //   },
      // })
    })
  },
  methods: {
    finishing() {
      this.loading = false
    },
  },
}
</script>