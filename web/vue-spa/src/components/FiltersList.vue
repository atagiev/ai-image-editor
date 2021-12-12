<template>
  <div class="filters_list">
    <FilterItem :activeType='activeType'></FilterItem>
    <FilterItem :activeType='activeType'></FilterItem>
    <FilterItem :activeType='activeType'></FilterItem>
    <FilterItem :activeType='activeType'></FilterItem>
    <FilterItem :activeType='activeType'></FilterItem>
  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem'

export default {
  components: {
    FilterItem
  },
  props: ['activeType'],
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
