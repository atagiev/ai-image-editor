<template>
  <div class="filters">
    <div class="filters_list__classic filters_list" v-if="this.activeType == 'classic'">
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='greyscale.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Сепия' previewImage='brown.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Инвертирование' previewImage='invert.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Рисунок' previewImage='handdraw.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Рельеф' previewImage='emboss.jpg'></FilterItem>
    </div>
    <div class="filters_list__neural filters_list" v-else-if="this.activeType == 'neural'">
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='brown.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='greyscale.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='greyscale.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='greyscale.jpg'></FilterItem>
      <FilterItem :activeType='activeType' nameFilter='Черно-белое' previewImage='greyscale.jpg'></FilterItem>
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem'

export default {
  components: {
    FilterItem
  },
  data: () => ({
  }),
  props: ['activeType', 'nameFilter', 'previewImage'],
  methods: {
  }
}
</script>

<style scoped>
  .filters_list{
  margin-left: 30px;
  display: flex;
  height: auto;
  gap: 20px;
}
</style>
