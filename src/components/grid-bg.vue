<template>
  <div class="grid_bg light_bg">
    <img src="../assets/grid-line.svg" alt="grid-line" />
  </div>
</template>

<style lang="css" scoped>
.grid_bg {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 60vh;
  z-index: -10;
  pointer-events: none;
}

.grid_bg img {
  object-fit: cover;
  object-position: 40% 10%;
  width: 100%;
  height: 100%;
  display: block;
  max-width: 100%;
}
</style>
