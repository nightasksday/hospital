<template>
  <div id="app" style="height:100%">
    <router-view/>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

  </div>
</template>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  body {
    margin: 0px;
    padding: 0px;
  }
</style>
