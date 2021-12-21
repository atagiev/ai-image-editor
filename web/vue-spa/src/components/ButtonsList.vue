<template>
  <div class='btns-list'>
    <div class="delete-button">
      <button class="dlt-btn btn" @click='onClickDelete'>
        <i class="el-icon-delete-solid"></i>
      </button>
    </div>
    <div class="upload-button">
      <button class="upld-btn btn" @click='onClickUpload'>
        <i class="el-icon-upload2"></i>
      </button>
    </div>
    <div class="download-button">
      <button class="dwld-btn btn" @click='onClickDownload'>
        <i class="el-icon-download"></i>
      </button>
    </div>
    <div class="help-button">
      <button class="help-btn btn" @click='onClickHelp'>
        <i class="el-icon-s-help"></i>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ButtonsList',
  components: {
  },
  data: () => ({
    isModalVisible: false,
    msg: '',
    typeAction: ''
  }),
  methods: {
    onClickUpload () {
      this.msg = 'Вы действительно хотите загрузить новое изображение?'
      this.typeAction = 'upload'
      this.showModal()
    },
    onClickDelete () {
      this.msg = 'Вернуть исходное изображение?'
      this.typeAction = 'delete'
      this.showModal()
    },
    onClickDownload () {
      this.msg = 'Начать скачивание изображения? Вы сможете продолжить редактирование'
      this.typeAction = 'download'
      this.showModal()
    },
    onClickHelp () {
      this.msg = 'Для редактирования Вашего изображения представлено два типа фильтров: классический (кнопка "C") и нейронные сети (кнопка "NN").' +
                  ' Обратите внимание: применение фильтра из списка NN может занять некоторое время'
      this.typeAction = 'help'
      this.showModal()
    },
    showModal () {
      this.isModalVisible = true
      this.$emit('onChangeModalStatus', this.isModalVisible, this.msg, this.typeAction)
    }
  }
}

</script>

<style scoped>
.btns-list{
  position: sticky;
  float: right;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-top: 50px;
  gap: 10px;
}
button{
  height:10px;
  padding: 10px;
}
.btn{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E5E5E5;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}
.btn:hover{
  background-color: #52da91bd;
  box-shadow: 0 0 5px;
  transform: scale(1.4);
}
.btn:active{
  background-color: #82fdbbbd;
}
.btn:active i{
  transform: scale(1.4);
}
</style>
