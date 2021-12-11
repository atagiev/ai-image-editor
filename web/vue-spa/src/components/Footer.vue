<template>
  <div class="footer">
    <div class="welcome-container" v-if="!isImageUploaded">
      <div class="welcome-container__text">
        Добро пожаловать!<br>
        Загрузите ваше первое изображение
      </div>
      <!-- action указывает куда загружается файл -->
      <el-upload
        class="upload-file"
        ref="upload"
        accept="image/jpeg,image/png"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :multiple="false">
        <el-button class="upld-btn" slot="trigger" type="success">Загрузить</el-button>
        <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload">Загрузить</el-button> -->
        <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
      <!-- <div class="filters-container__upload">
        <input type="file" class="input-file" ref="upload" accept="image/jpeg,image/png" v-on:change="handleFileUpload()" v-on:click="submitFile()">
        <label class="input-file__label" for="input-file">
          <span class="upload-file__text">Загрузить</span>
        </label>
      </div> -->
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
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
        <FilterItem></FilterItem>
      </div>
    </div>

  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem'

export default ({
  name: 'Footer',
  components: {
    FilterItem
  },
  data: () => ({
    isImageUploaded: true,
    isActiveClassic: true,
    isActiveNeural: false
  }),
  methods: {
    onClickBtnClassic () {
      this.isActiveClassic = true
      this.isActiveNeural = false
    },
    onClickBtnNeural () {
      this.isActiveClassic = false
      this.isActiveNeural = true
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
  height: 40px;
  font-size: 24px;
  background:#309860;
  border: none;
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
.filters__list{
  margin-left: 30px;
  display: flex;
  height: auto;
  gap: 30px;
}
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
input{
  display: none;
}
.input-file{
  opacity: 0;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  width: 0.4px;
  height: 0.4px;
}
.input-file__label {
  width: 110px;
  font-size: 24px;
  background-color: #309860;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 49px;
  border-radius: 6px;
  cursor: pointer;
}
.input-file__label:hover {
  background:#4ac885a9;
}
</style>
