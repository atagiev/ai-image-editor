<template>
  <div id="app">
    <el-row>
      <el-button>Default</el-button>
      <el-button type='primary'>Primary</el-button>
      <el-button type='success'>Success</el-button>
      <el-button type='info'>Info</el-button>
      <el-button type='warning'>Warning</el-button>
      <el-button type='danger'>Danger</el-button>
    </el-row>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
