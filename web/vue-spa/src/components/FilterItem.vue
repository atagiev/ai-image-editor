<template>
  <div @click='onClickFilter' class="filter-item">
    <div class="filter-item" :class="classObj"
    >
        <div class="filter-item__filter-name">
          {{ nameFilter }}
        </div>
    </div>
<!-- :style="{'background': 'url('+ previewImage + ') no-repeat', 'background-size': 'cover'}" -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default ({
  name: 'FilterItem',
  props: ['activeType', 'nameFilter', 'previewImage', 'active'],
  data: () => ({
    typeFilter: '',
    isActiveFilter: false
  }),
  methods: {
    ...mapActions(['changeEffect', 'changeActiveFilter']),
    onClickFilter () {
      this.changeEffect(this.nameFilter)
      this.changeActiveFilter(this.nameFilter)
      this.isActiveFilter = true
    }
  },
  computed: {
    classObj () {
      return {
        'filter-item__classic-picture': this.activeType === 'classic',
        'filter-item__neural-picture': this.activeType === 'neural'
      }
    }
  }
})
</script>

<style scoped>

.filter-item:hover{
  border: 3px solid #4ac885a9;
}
.filter-item{
  background-size: cover;
}
.filter-item__classic-picture{
  background: url("../assets/orig_picture.jpg") no-repeat;
  border: 3px solid transparent;
  object-fit:cover;
  background-size: cover;
  width: 200px;
  box-sizing: content-box;
  cursor: pointer;
}
.filter-item__neural-picture{
  border: 3px solid transparent;
  background: url("../assets/neuron_photo.jpeg") no-repeat;
  background-size: cover;
  width: 200px;
  box-sizing: content-box;
  cursor: pointer;
}
.filter-item__filter-name{
  margin-top: 90px;
  padding-left: 5px;
  background-color: rgba(54, 51, 51, 0.81);
  text-align: left;
}
.clicked_filter {
  border: 3px solid #4ac885a9;
}
</style>
