<template>
  <div class="info-picture">
    <div class="info-picture__name">
      Название картинки.jpg
    </div>
    <div class="info-picture__resolution">
      1920x1080
    </div>
  </div>
</template>

<script>
// import PictureItem from '@/components/PictureItem'

export default ({
  name: 'InfoPicture',
  components: {
    // PictureItem
  }
  // mounted () {
  //   const picture = this.$parent.$refs.picture
  //   console.log(picture.clientWidth)
  // }

})
</script>

<style scoped>
.info-picture{
  background-color: rgba(0, 0, 0, 0.329);
  display: flex;
  width: 500px;
  justify-content: space-between;
  margin: auto;
  padding: 10px 15px;
  border-radius: 20px;
  margin-top: 25px;
}
</style>
