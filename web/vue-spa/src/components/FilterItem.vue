<template>
  <div @click='onClickFilter' class="filter-item">
    <div class="filter-item__classic-picture" :class="classObj">
        <div class="filter-item__filter-name">
          {{ nameFilter }}
        </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default ({
  name: 'FilterItem',
  props: ['activeType'],
  data: () => ({
    nameFilter: 'Название фильтра',
    classicFiltersNames: [],
    typeFilter: '',
    isActiveFilter: false,
    previewImage: ''
  }),
  methods: {
    ...mapActions(['changeEffect']),
    onClickFilter () {
      this.changeEffect(this.nameFilter)
    },
    changeItem () {
      this.typeFilter = this.activeType
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
.filter-item__classic-picture{
  border: 3px solid transparent;
  background: url("../assets/orig_picture.jpg") no-repeat;
  /* background: url(" + {{ previewImage }} + ") no-repeat; */
  /* object-fit:cover; */
  background-size: cover;
  width: 200px;
  /* height: 100%; */
  box-sizing: content-box;
  cursor: pointer;
}
.filter-item__neural-picture{
  border: 3px solid transparent;
  background: url("../assets/neuron_photo.jpeg") no-repeat;
  /* background: url(" + {{ previewImage }} + ") no-repeat; */
  /* object-fit:cover; */
  background-size: cover;
  width: 200px;
  /* height: 100%; */
  box-sizing: content-box;
  cursor: pointer;
}
.filter-item__filter-name{
  margin-top: 90px;
  padding-left: 5px;
  background-color: rgba(54, 51, 51, 0.81);
  text-align: left;
}

</style>
