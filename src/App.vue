<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ui.secondary.menu {
  margin: 10px;
  text-align: center;
  font-size: 1.5rem;
}

.item > a {
  font-weight: bold;
  color: #2c3e50;
}

.item > .router-link-exact-active {
  color: #0A806B;
}

img {
  height: 40px;
  text-align: left;
  margin: 20px;
}

.left.menu {
  font-size: 3rem;
}

</style>
