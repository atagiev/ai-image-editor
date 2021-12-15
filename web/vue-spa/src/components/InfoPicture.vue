<template>
  <div class="info-picture">
    <div class="info-picture__name">
      {{ fileProperty }}
    </div>
    <div class="info-picture__resolution">
      {{ CUR_FILE.naturalHeight }}
      <!-- {{ this.file }} -->
      <!-- {{ getImgSize() }} -->
    </div>
  </div>
</template>

<script>
// import PictureItem from '@/components/PictureItem'
import { mapGetters } from 'vuex'

export default ({
  name: 'InfoPicture',
  components: {
    // PictureItem
  },
  data: () => ({
    resolution: '',
    file: 'empty',
    isFileReceived: false
  }),
  methods: {
    setNewFile () {
      this.file = this.$store.getters.CUR_FILE
    }
    // getImgSize () {
    //   // var url = window.URL
    //   // var newImg = new Image()
    //   this.file.onload = function () {
    //     var height = this.file.height
    //     var width = this.file.width
    //     console.log('The image size is ' + width + '*' + height)
    //   }
    //   // newImg.src = url.createObjectURL(this.file)
    // }
  },
  computed: {
    ...mapGetters(['CUR_FILE']),
    fileProperty () {
      return this.CUR_FILE.name
    }
    // file: {
    //   get: function () {
    //     return this.file
    //   },
    //   set: function () {
    //     this.file = this.$store.getters.CUR_FILE
    //     console.log(this.file.naturalHeight, 'высота картинки')
    //   }
    // }
  }
})

</script>

<style scoped>
  .info-picture{
    background-color: rgba(0, 0, 0, 0.329);
    display: flex;
    /* align-items: center; */
    margin-left: 360px;
    width: 500px;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 20px;
    margin-top: 25px;
  }
</style>
