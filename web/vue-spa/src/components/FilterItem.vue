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
      // axios.defaults.timeout = 40000
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
    convertToBlob () {
      // eslint-disable-next-line no-unused-vars
      const b64toBlob = (b64Data, contentType = 'image/jpeg', sliceSize = 512) => {
        const byteCharacters = Buffer.from(b64Data, 'base64')
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize)

          const byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }

          const byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }

        const blob = new Blob(byteArrays, { type: contentType })
        return blob
      }
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
          axios({
            method: 'get',
            url: `http://localhost:8000/${id}.jpg`,
            responseType: 'blob'
          }).then(response => {
            console.log(response)
            const reader = new FileReader()
            reader.addEventListener('load', function () {
              this.imageSrc = reader.result
              this.changeURLCurFile(reader.result)
            }.bind(this), false)
            if (response.data) {
              reader.readAsDataURL(response.data)
            }
          })
          // console.log(response.data)
          // const base64Str = Buffer.from(new Uint8Array(response).reduce((data, byte) => data + String.fromCharCode(byte), ''), 'utf8').toString('base64')
          // 1 способ
          // const base64Str = (response.data).toString('utf8')
          // console.log(base64Str)
          // const fileURL = 'data:image/jpeg;base64,' + base64Str
          // console.log(fileURL)
          // 2 способ
          // fetch(`http://localhost:8000/${id}.jpg`)
          //   .then(response => {
          //     console.log(response.body)
          //     const buffer = response.arrayBuffer()
          //     const bytes = new Uint8Array(buffer)
          //     const blob = new Blob([bytes.buffer])

          //     // const image = document.createElement('img')
          //     const reader = new FileReader()
          //     reader.addEventListener('load', (e) => {
          //       console.log(reader.result)
          //       // image.src = e.target.result
          //       this.changeURLCurFile(reader.result)
          //       // this.$el.append(image)
          //     })
          //     reader.readAsDataURL(blob)
          //   })
            // 3 способ
            // const file = this.convertToBlob(response.data, 'image/jpeg')
            // console.log(typeof (file))
            // const reader = new FileReader()
            // reader.addEventListener('load', function () {
            //   this.imageSrc = reader.result
            //   this.changeURLCurFile(reader.result)
            // }.bind(this), false)
            // if (file) {
            //   reader.readAsDataURL(file)
            // }
            // 4 способ
            // const str2blob = txt => new Blob([txt], { type: 'image/jpeg' })
            // const file = str2blob(response.data)
            // console.log(file)
            // const imageUrl = URL.createObjectURL(file)
            // console.log(imageUrl)
            // this.changeURLCurFile(imageUrl)
            // 5 способ
            // const base64Str = (response.data).toString('base64')
            // const uint8str = new Uint8Array(response.data)
            // console.log(base64Str)
            // console.log(uint8str)
            // const reader = new FileReader()
            // reader.addEventListener('load', function () {
            //   this.imageSrc = reader.result
            //   this.changeURLCurFile(reader.result)
            // }.bind(this), false)
            // if (file) {
            //   reader.readAsDataURL(file)
            // }
            // })
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
