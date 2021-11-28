<template>
  <div class="picture-item" ref='picture'>
    <img width="700px" src="../assets/orig_picture.jpg" alt="picture">
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
  name: 'PictureItem'

})
</script>

<style scoped>
  .picture-item{
    margin: auto;
    margin-top: 20px;
    width: 1000px
    /* width: 00px; */
  }
</style>
