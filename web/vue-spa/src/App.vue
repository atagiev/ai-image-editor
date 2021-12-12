<template>
  <div id="app">
    <el-container direction="vertical">
      <header>
        <Header></Header>
      </header>
      <main >
        <ButtonsList v-if='statusUpload'></ButtonsList>
        <InfoPicture v-if='statusUpload'></InfoPicture>
        <PictureItem v-if='statusUpload'></PictureItem>
        <EffectText v-if='statusUpload'></EffectText>
      </main>
      <footer>
        <Footer @onChangeStatus="onChangeStatusInUpload"></Footer>
      </footer>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PictureItem from '@/components/PictureItem'
import InfoPicture from './components/InfoPicture.vue'
import EffectText from './components/EffectText.vue'
import ButtonsList from './components/ButtonsList.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    PictureItem,
    InfoPicture,
    EffectText,
    ButtonsList
  },
  data: () => ({
    statusUpload: false
  }),
  methods: {
    onChangeStatusInUpload (status) {
      this.statusUpload = status
      console.log(status)
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  width: 1240px;
  margin: auto;
  overflow:hidden;
}
main {
  background-color: rgba(54, 51, 51, 0.81);
  height: 600px;
}
footer{
  background-color: #4D4E53;
  height: 150px;
}

</style>
