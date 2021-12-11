<template>
  <div class="filter-item">
    <div class="filter-item__temp-picture">
        <div class="filter-item__filter-name">
          {{ nameFilter }}
        </div>
    </div>

  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
  name: 'FilterItem',
  data: () => ({
    nameFilter: 'Название фильтра',
    typeFilter: ''
  })
})
</script>

<style scoped>
.filter-item:hover{
  border: 3px solid #4ac885a9;
}
.filter-item__temp-picture{
  border-top: 1px solid transparent;
  background: url("../assets/orig_picture.jpg") no-repeat;
  /* object-fit:cover; */
  background-size: cover;
  width: 200px;
  height: 100%;
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
