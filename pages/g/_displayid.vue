<template>
  <div>
    <OverlayLoading v-if="loading" />
    <GalleryDisplay :withrouter="true" @finishloading="finishing"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    finishing() {
      this.loading = false
    }
  }
}
</script>