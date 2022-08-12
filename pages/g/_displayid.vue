<template>
  <div>
    <GalleryDisplay :withrouter="false"/>
  </div>
</template>

<script>
export default {
  
  middleware: ['checkLogin'],
}
</script>