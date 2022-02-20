import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Footer from '../../src/components/Footer.vue'
import axios from 'axios'

const event = {
  target: {
    files: [
      {
        name: 'image.jpg',
        size: 50000,
        type: 'image/jpg'
      }
    ]
  }
}
jest.mock('axios')

describe('Footer.vue testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(Footer, {
    vueInstance
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper.isVueInstance()).toBe(true)
    // ожидаем, что селектор компонента действительно является “YouTubeWidget”
    expect(wrapper.is(Footer)).toBe(true)
  })
})

describe('Testing handlefileupload', () => {
  const wrapper = mount(Footer)
  it('initialized correctly', () => {
    const responseGet = {
      data:
      {
        success: true
      }
    }
    const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null)
    axios.get.mockResolvedValue(responseGet)
    wrapper.vm.handleFileUpload(event)
    // Assert that the FileReader object was called with the uploaded image
    expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0])
  })
})

describe('Testing limitation of pictures', () => {
  const wrapper = shallowMount(Footer)
  beforeEach(() => {
    const responseGet = {
      data:
        {
          h: 20,
          w: 10
        }
    }
    // Set the mock call to GET to return a successful GET response
    // axios.post.mockResolvedValue(responseGet)
    axios.post = jest.fn().mockResolvedValue(responseGet)

    // render the component
    // eslint-disable-next-line no-unused-vars
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('correct resolution accepting without errors', () => {
    wrapper.vm.uploadPicture(event)
    expect(axios.get).toHaveBeenCalledTimes(1)

    wrapper.vm.$nextTick().then(function () {
      expect(this.isUploaded).toMatch('true')
      console.log(this.isUploaded)
    })
  })
  it('incorrect resolution accepting with errors', () => {
    wrapper.vm.uploadPicture(event)
    // expect(axios.get).toHaveBeenCalledTimes(1)

    wrapper.vm.$nextTick().then(function () {

    })
  })
})

// 1) Картинка с допустимыми разрешениями проходит без ошибки
// 2) Картинка с недопустимым разрешением не загружается и выкидывает ошибку
// 3) Загруженная картинка появляется на экране
// 4) Проверка, что без примененного фильтра текст эффекта = "отсутствует"
// 5) Проверка что эффект сбрасывается в "отсутсвует" при нажатии на кнопку "удалить"
// 6) Проверка, что при нажатии на кнопки выбора типов фильтров меняется список фильтров
// 7) Проверка, что текст эффекта соотвествует примененному эффекту пользователем
// 8) Проверка, что при загрузке нвоого изображения автоматически нажимается кнопка "загрузить" на главном экране
// 10) Проверка, что при загрузке слишком большйо картинки лсит с нейронными фильтрами будет недоступен.
// 11) Проверка, что при нажатии на фильтр, картинка на экране меняется
// 12) Проверка, что при загрузке картинки до применения фильтра кнопки сохранить и сброс недоступны
// 14) Проверка, что при сбросе картинки, изменяется изображение на экране и кнопки сохранить и сброс недоступны
// 15) Проверка, что на начальном экране кнопки недоступны
// 19) Проверка, что картинку с иным форматом (или другой файл в принципе) загрузить невозможно
// 20) Проверка, что при нажатии кнопок появляется окно с предупреждением/пояснением/вопросом
// 21) Проверка, что в поле "разрешение" отображается разрешение картинки
// 22) Проверка, что в поле "название файла" отображается название файла
// 25) Проверка, что при наведении мышкой фильтр подсвечивается
// 26) Проверка, что при наведении на активную кнопку она также подсвечивается
// 27) Проверка, что при нажатии кнопки "нет" в диалоговом окне оно закрывается и ничего не происходит
// 28) Провекра, что при загрузке изображения загружается интерфйес страницы редактирования
// 29) Проверка, что во время применения фильтра кнопки заблокированы
// 30) Проверка, что во время применения фильтра запускается анимация спиннера
