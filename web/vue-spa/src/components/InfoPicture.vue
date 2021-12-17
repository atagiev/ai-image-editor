<template>
  <div class="info-picture">
    <div class="info-picture__name">
      {{ fileProperty }}
    </div>
    <div class="info-picture__resolution">
      {{ CUR_FILE.naturalHeight }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'InfoPicture',
  components: {
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
  },
  computed: {
    ...mapGetters(['CUR_FILE']),
    fileProperty () {
      return this.CUR_FILE.name
    }
  }
})

</script>

<style scoped>
  .info-picture{
    background-color: rgba(0, 0, 0, 0.329);
    display: flex;
    margin-left: 360px;
    width: 500px;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 20px;
    margin-top: 25px;
  }
</style>
