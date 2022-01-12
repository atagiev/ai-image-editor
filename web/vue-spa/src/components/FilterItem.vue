<template>
  <div @click='onClickFilter' class="filter">
    <div class="filter-item" :class="classObj"
    :style="{'background': 'url('+ itemImage + ') no-repeat'}">
      <div class="filter-item__filter-name">
        {{ nameFilter }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default ({
  name: 'FilterItem',
  props: ['activeType', 'nameFilter', 'previewImage', 'active'],
  data: () => ({
    typeFilter: '',
    isActiveFilter: false,
    filterName: '',
    curFile: '',
    urlCurFile: ''
  }),
  methods: {
    ...mapActions(['changeEffect', 'changeActiveFilter', 'changeURLCurFile', 'changeCurFile']),
    onClickFilter () {
      axios.defaults.timeout = 10000
      axios.get('http://localhost:5000/ping')
        .then(response => {
          this.changeEffect(this.nameFilter)
          this.changeActiveFilter(this.nameFilter)
          this.isActiveFilter = true
          this.filterName = this.nameFilter
          this.curFile = this.$store.getters.CUR_FILE
          this.urlCurFile = this.$store.getters.URL_CUR_FILE
          console.log(this.nameFilter, this.$store.getters.CUR_FILE)
          this.sendFilter()
        })
        .catch(error => {
          this.sendWaitingError()
          console.log(error)
        })
    },
    // запрос на отправку текущей картинки и названия фильтра
    sendFilter () {
      const formData = new FormData()
      formData.append('filter_name', this.filterName)
      formData.append('image', this.curFile)
      // const config = {
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   } comment
      // }
      axios.post('http://localhost:5000/', formData)
      // Если запрос успешен
        .then(response => {
          console.log(response.data.id)
          const id = response.data.id
          axios.get(`http://localhost:8000/${id}.jpg`)
            .then(response => {
              console.log(response.data)
            })
            .catch(function (error) {
              console.log(error)
            })
          // this.changeURLCurFile(response.data.path)
          // fetch(response.data.path)
          //   .then(res => res.blob()) // Gets the response and returns it as a blob
          //   .then(blob => {
          //     this.changeCurFile(blob)
          // let objectURL = URL.createObjectURL(blob);
          // let myImage = new Image();
          // myImage.src = objectURL;
          // document.getElementById('myImg').appendChild(myImage)
          // })
          // eslint-disable-next-line prefer-const
          // let reader = new FileReader()
          // reader.addEventListener('load', function () {
          //   this.imageSrc = reader.result
          //   this.changeURLCurFile(reader.result)
          // }.bind(this), false)
          // if (response.data) {
          //   reader.readAsDataURL(response.data)
          // }
        })
      // Если запрос с ошибкой
        .catch(function (error) {
          console.log(error)
        })
    },
    sendWaitingError () {
      const errorText = 'Произошла ошибка: в данный момент сервер недоступен. Попробуйте применить фильтр еще раз или выберите другой.'
      this.$emit('onChangeModal', true, errorText, 'uploadPage')
      // console.log(error)
    }
  },
  computed: {
    ...mapGetters(['CUR_FILE', 'URL_CUR_FILE']),
    classObj () {
      return {
        'filter-item__classic-picture': this.activeType === 'classic',
        'filter-item__neural-picture': this.activeType === 'neural'
      }
    },
    itemImage () {
      return require(`../assets/${this.previewImage}`)
    }
  }
})
</script>

<style scoped>

.filter-item:hover{
  border: 3px solid #4ac885a9;
}
.filter-item{
  background-size: cover !important;
}
.filter-item__classic-picture{
  border: 3px solid transparent;
  width: 200px;
  box-sizing: content-box;
  cursor: pointer;
}
.filter-item__neural-picture{
  border: 3px solid transparent;
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
