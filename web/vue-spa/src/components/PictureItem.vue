<template>
  <div class="picture-item" ref='picture'>
    <img  height="450px" :src="CUR_URL_FILE" alt="picture">
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { mapGetters } from 'vuex'

export default ({
  name: 'PictureItem',
  data: () => ({
    image: '',
    file: ''
  }),
  computed: {
    ...mapGetters(['CUR_FILE', 'CUR_URL_FILE'])
    // computedURL () {
    //   console.log(this.CUR_URL_FILE)
    //   debugger
    //   return 1
    // }

  },
  methods: {
  },
  mounted () {
    this.image = this.CUR_URL_FILE
    console.log(this.image)
  }

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
