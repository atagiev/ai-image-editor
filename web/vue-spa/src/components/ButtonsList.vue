<template>
  <div class='btns-list'>
    <div class="accept-button">
      <button class="acpt-btn btn">
        <i class="el-icon-check"></i>
      </button>
    </div>
    <div class="reset-button">
      <button class="rst-btn btn">
        <i class="el-icon-refresh-left"></i>
      </button>
    </div>
    <div class="delete-button">
      <button class="dlt-btn btn">
        <i class="el-icon-delete-solid"></i>
      </button>
    </div>
    <div class="upload-button">
      <button class="upld-btn btn">
        <i class="el-icon-upload2"></i>
      </button>
    </div>
    <div class="download-button">
      <button class="dwld-btn btn">
        <i class="el-icon-download"></i>
      </button>
    </div>
    <div class="help-button">
      <button class="help-btn btn">
        <i class="el-icon-s-help"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonsList'
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
