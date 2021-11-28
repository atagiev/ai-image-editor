<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        Main

      </el-main>
      <el-footer>
        <FiltersList></FiltersList>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import FiltersList from '@/components/FiltersList'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Header,
    FiltersList
  }
}
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  /* margin-top: 60px; */
  width: 1240px;
  margin: auto;
  overflow:hidden;
}
el-main {
  background-color: rgba(54, 51, 51, 0.81);;
  height: 600px;
}
el-footer{
  background-color: #4D4E53;
  height: 150px;
}

</style>
