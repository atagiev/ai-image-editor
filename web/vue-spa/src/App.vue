<template>
  <div id="app">
    <el-container direction="vertical">
      <header>
        <Header></Header>
      </header>
      <main>
        <ButtonsList  @onChangeModalStatus="onChangeModal" :statusUpload = statusUpload></ButtonsList>
        <InfoPicture v-if='statusUpload'></InfoPicture>
        <PictureItem v-if='statusUpload'></PictureItem>
        <EffectText v-if='statusUpload'></EffectText>
      </main>
      <footer>
        <Footer v-show="isServerOn" :isImageUploaded="statusUpload" @onChangeStatus="onChangeStatusInUpload"></Footer>
      </footer>
    </el-container>
    <modal
      :userAction = userAction
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
import { mapGetters, mapActions } from 'vuex'
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
    userAction: '',
    isServerOn: false
  }),
  methods: {
    ...mapActions(['changeURLCurFile', 'changeEffect']),
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
        this.changeEffect('отсутствует')
        this.closeModal()
      }
      if (this.userAction === 'download') {
        // eslint-disable-next-line prefer-const
        let link = document.createElement('a')
        link.href = this.$store.getters.URL_CUR_FILE
        link.download = this.$store.getters.CUR_FILE.name
        link._target = 'blank'
        link.click()
        this.closeModal()
      }
      if (this.userAction === 'delete') {
        this.changeURLCurFile(this.$store.getters.URL_INIT_FILE)
        this.changeEffect('отсутствует')
        this.closeModal()
      }
      if (this.userAction === 'help') {
        this.closeModal()
      }
    },
    isServerAnswer () {
      axios.get(' http://localhost:5000/ping')
      // Если запрос успешен
        .then(response => {
          this.isServerOn = true
          console.log(response)
        })
      // Если запрос с ошибкой
        .catch(error => {
          const errorText = 'Произошла ошибка: сервер недоступен. Попробуйте перезагрузить страницу'
          this.onChangeModal(true, errorText, 'uploadPage')
          this.isServerOn = false
          console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters(['MODAL_STATUS', 'URL_CUR_FILE', 'CUR_FILE', 'CUR_EFFECT'])
  },
  created () {
    this.isServerAnswer()
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
