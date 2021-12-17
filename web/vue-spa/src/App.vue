<template>
  <div id="app">
    <el-container direction="vertical">
      <header>
        <Header></Header>
      </header>
      <main>
        <ButtonsList  @onChangeModalStatus="onChangeModal" v-if='statusUpload'></ButtonsList>
        <InfoPicture v-if='statusUpload'></InfoPicture>
        <PictureItem v-if='statusUpload'></PictureItem>
        <EffectText v-if='statusUpload'></EffectText>
      </main>
      <footer>
        <Footer :isImageUploaded="statusUpload" @onChangeStatus="onChangeStatusInUpload"></Footer>
      </footer>
    </el-container>
    <modal
      :msg = modalMessage
      v-show="isModalVisible"
      @close="closeModal"
      @accept="acceptAction"
    />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PictureItem from '@/components/PictureItem'
import InfoPicture from './components/InfoPicture.vue'
import EffectText from './components/EffectText.vue'
import ButtonsList from './components/ButtonsList.vue'
import modal from './components/DialogBox.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    PictureItem,
    InfoPicture,
    EffectText,
    ButtonsList,
    modal
  },
  data: () => ({
    statusUpload: false,
    isModalVisible: false,
    modalMessage: '',
    userAction: ''
  }),
  methods: {
    onChangeStatusInUpload (status) {
      this.statusUpload = status
    },
    onChangeModal (status, msg, action) {
      this.isModalVisible = status
      this.modalMessage = msg
      this.userAction = action
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    acceptAction () {
      if (this.userAction === 'upload') {
        this.onChangeStatusInUpload(false)
        this.closeModal()
      }
      if (this.userAction === 'download') {
        axios({
          url: 'http://localhost:8000/',
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', 'file.jpg')
          document.body.appendChild(fileLink)

          fileLink.click()
        })
      }
    }
  },
  computed: {
    ...mapGetters(['MODAL_STATUS'])
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
