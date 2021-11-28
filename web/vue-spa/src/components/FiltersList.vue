<template>
  <div class="filters-container">
    <div class="filters-container__welcome">
      Добро пожаловать!<br>
      Загрузите ваше первое изображение
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false">
      <el-button slot="trigger" type="primary">Загрузить</el-button>
      <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
    </el-upload>
  </div>
</template>

<script>

export default ({
  name: 'FiltersList',
  methods: {

  }

})
</script>

<style scoped>
.filters-container{
  display: flex;
  margin: 50px 250px;
  justify-content: space-between;
  /* margin-top: 800px; */
}
.filters-container__welcome{
  text-align: left;
  color: white;
  font-size: 22px;
  line-height: 28px;
}
.el-button{
  width: 200px;
  font-size: 24px;
  background:#309860;
  border: none;
}
.el-button:hover{
  background:#4ac885a9;
}
</style>
