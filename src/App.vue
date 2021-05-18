<template>
  <div id="app" class="container">
    <router-view></router-view>
   
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container{
        width:1140px;
        margin:0 auto;
    }
</style>
