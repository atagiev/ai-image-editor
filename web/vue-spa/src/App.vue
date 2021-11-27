<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Header
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
  /* margin-top: 60px; */
  width: 1240px;
  margin: auto;
}
el-main {
  background-color: rgba(54, 51, 51, 0.81);;
  height: 800px;
}

</style>
