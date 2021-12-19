<template>
  <div class="footer">
    <div class="welcome-container" v-if="!isImageUploaded">
      <div class="welcome-container__text">
        Добро пожаловать!<br>
        Загрузите ваше первое изображение
      </div>
      <div class="filters-container__upload">
        <label class="input__file-button" for="input-file">
          <input type="file" class="input-file" ref="upload" accept="image/jpeg,image/png"
            @change="handleFileUpload( $event )">
          <span class="input__file-button-text">Загрузить</span>
        </label>
      </div>
    </div>
    <div class="filters-container" v-if="isImageUploaded">
      <div class="filters__buttons">
        <button class="classic-btn btn"
          :class="{'active-btn':isActiveClassic}"
          @click='onClickBtnClassic'>C</button>
        <button class="neural-btn btn"
          :class="{'active-btn':isActiveNeural}"
          @click='onClickBtnNeural'>NN</button>
      </div>
      <div class="filters__list">
        <FiltersList :activeType='activeType'></FiltersList>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FiltersList from '@/components/FiltersList'
import axios from 'axios'

export default ({
  name: 'Footer',
  components: {
    FiltersList
  },
  props: ['isImageUploaded'],
  data: () => ({
    isImageUploaded: false,
    isActiveClassic: true,
    isActiveNeural: false,
    activeType: 'classic',
    file: '',
    imageSrc: ''
  }),
  methods: {
    ...mapActions(['changeURLInitFile', 'changeURLCurFile', 'changeResolution', 'changeInitFile', 'changeCurFile']),
    onClickBtnClassic () {
      this.isActiveClassic = true
      this.isActiveNeural = false
      this.activeType = 'classic'
    },
    onClickBtnNeural () {
      this.isActiveClassic = false
      this.isActiveNeural = true
      this.activeType = 'neural'
    },
    handleFileUpload (event) {
      this.file = event.target.files[0]
      this.isImageUploaded = true
      // eslint-disable-next-line prefer-const
      let reader = new FileReader()
      reader.addEventListener('load', function () {
        this.imageSrc = reader.result
        this.changeURLInitFile(reader.result)
        this.changeURLCurFile(reader.result)
      }.bind(this), false)
      if (this.file) {
        reader.readAsDataURL(this.file)
      }
      this.changeCurFile(event.target.files[0])
      this.changeInitFile(event.target.files[0])
      this.$emit('onChangeStatus', this.isImageUploaded)
    },
    sendPicture () {
      axios.post('/', this.file)
      // Если запрос успешен
        .then(function (response) {
          console.log(response)
        })
      // Если запрос с ошибкой
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})
</script>

<style scoped>
.footer{
  height: 100%;
}
.welcome-container{
  display: flex;
  margin: 50px 250px;
  justify-content: space-between;
}
.welcome-container__text{
  text-align: left;
  color: white;
  font-size: 22px;
  line-height: 28px;
}
.upload-file{
  height: 100%;
}
.upld-btn{
  width: 200px;
  font-size: 24px;
  background:#309860;
  border: none;
  text-align: center;
}
.filters-container{
  height: 80%;
  margin-top: 15px;
  display: flex;
  width: 100%;
}
.filters__buttons{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55px;
  height: auto;
  margin: 13px 10px;
  gap: 10px;
}
.btn{
  color: white;
  background: #3C3939;
  border: 0px solid #4ac885a9;
  border-radius: 7px;
  font-size: 20px;
  height: 55px;
  cursor: pointer;
}
.btn:hover{
  box-shadow: inset -2px -2px #4ac885a9, inset 2px 2px #4ac885a9;
}
.active-btn{
  background-color: #52da91bd;
  transform: scale(1.1);
  box-sizing: content-box;
}
.input-file{
  opacity: 0;
  height: 100%;
  position: absolute;
  cursor: pointer;
}
.input__file-button {
  position: relative;
  width: 110px;
  font-size: 24px;
  background-color: #309860;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 49px;
  border-radius: 6px;

}
.input__file-button:hover {
  background:#4ac885a9;
}
</style>
