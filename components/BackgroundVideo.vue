<template>
  <video
    autoplay
    muted
    loop
    id="myVideo"
    src="/video/berawan.mp4"
    class="h-full w-full"
  >
    Your browser does not support HTML5 video.
  </video>
</template>

<style>
#myVideo {
  position: absolute;
  right: 0;
  top: -10px;
  min-width: 100%; 
  min-height: 100%;
  z-index:-1;
}
</style>