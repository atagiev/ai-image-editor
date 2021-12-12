<template>
  <div class="footer">
    <div class="welcome-container" v-if="!isImageUploaded">
      <div class="welcome-container__text">
        Добро пожаловать!<br>
        Загрузите ваше первое изображение
      </div>
      <!-- action указывает куда загружается файл -->
      <!-- <el-upload
        class="upload-file"
        ref="upload"
        accept="image/jpeg,image/png"
        action=""
        :limit="1"
        :multiple="false"
        v-on:change="handleFileUpload()">
        <el-button class="upld-btn" slot="trigger" type="success">Загрузить</el-button>
      </el-upload> -->
      <div class="filters-container__upload">

        <label class="input__file-button" for="input-file">
          <input type="file" class="input-file" ref="upload" accept="image/jpeg,image/png"
            @change="handleFileUpload( $event )" v-on:click="submitFile()">
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
// import FilterItem from '@/components/FilterItem'
import { mapActions } from 'vuex'
import FiltersList from '@/components/FiltersList'

export default ({
  name: 'Footer',
  components: {
    FiltersList
  },
  data: () => ({
    isImageUploaded: false,
    isActiveClassic: true,
    isActiveNeural: false,
    activeType: '',
    file: ''
  }),
  methods: {
    ...mapActions(['changeFile']),
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
      this.changeFile(event.target.files[0])
      this.$emit('onChangeStatus', this.isImageUploaded)
      console.log(this.file.name)
    },
    submitFile () {
      console.log('click')
    }
  }
})
</script>

<style scoped>
.footer{
  /* display: flex; */
  height: 100%;
}
.welcome-container{
  display: flex;
  margin: 50px 250px;
  justify-content: space-between;
  /* margin-top: 800px; */
}
.welcome-container__text{
  text-align: left;
  color: white;
  font-size: 22px;
  line-height: 28px;
}
.upload-file{
  /* max-width: 200px; */
  height: 100%;
}
.upld-btn{
  width: 200px;
  /* height: 40px; */
  font-size: 24px;
  background:#309860;
  border: none;
  text-align: center;
}
.el-button:hover{
  background:#4ac885a9;
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
/* .filters__list{
  margin-left: 30px;
  display: flex;
  height: auto;
  gap: 30px;
} */
.btn{
  /* padding: 10px; */
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
  /* border: 2px solid #4ac885a9; */
}
.active-btn{
  background-color: #52da91bd;

  transform: scale(1.1);
  box-sizing: content-box;
}
/* для варианта кнопки с инпутом */
.filters-container__upload {
  /* width: 100%;
  /* position: relative; */
  /* margin: 15px 0;
  text-align: center;  */
}
.input-file{
  opacity: 0;
  /* width: 200px; */
  height: 100%;
  /* visibility: hidden; */
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
