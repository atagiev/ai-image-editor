<template>
  <div class="picture-item" ref='picture'>
    <img  height="450px" :src="CUR_URL_FILE" alt="picture">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'PictureItem',
  data: () => ({
    image: '',
    file: ''
  }),
  computed: {
    ...mapGetters(['CUR_FILE', 'CUR_URL_FILE'])
  },
  methods: {
  },
  mounted () {
    this.image = this.CUR_URL_FILE
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
