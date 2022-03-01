import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Footer from '../../src/components/Footer.vue'
import axios from 'axios'
import store from '@/store'

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

const file = {
  name: 'image.jpg',
  size: 50000,
  type: 'image/jpg'
}

jest.mock('axios')

const mockData = [
  {success: true}
]
const mockDataPost = [
  {h: 40, w: 40}
]

jest.mock('axios', () => ({
  get: jest.fn(() => mockData),
  post: jest.fn(() => mockDataPost)
}))
// jest.mock('axios', () => ({
//   post: jest.fn(() => mockDataPost)
// }))

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
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(Footer)).toBe(true)
  })
})

describe('Testing handlefileupload', () => {
  const wrapper = mount(Footer)
  const responseGet = {
    data:
    {
      success: true
    }
  }
  const responseGetSize = {
    data:
    {
      h: 40,
      w: 40
    }
  }
  it('Testing filereader', () => {
    const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null)
    axios.get.mockResolvedValue(responseGet)
    wrapper.vm.handleFileUpload(event)
    // Assert that the FileReader object was called with the uploaded image
    expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0])
  })
  it('Testing axios get', async () => {
    jest.spyOn(wrapper.vm, 'handleFileUpload')
    axios.get.mockResolvedValue(responseGet)
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/ping')
  })
  it('Testing axios post', async () => {
    const formData = new FormData()
    formData.append('image', file)
    jest.spyOn(wrapper.vm, 'handleFileUpload')
    axios.post.mockImplementationOnce(() => Promise.resolve(responseGetSize))
    // axios.post.mockResolvedValue(responseGetSize)
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/get_size', formData)
  })
})

describe('Testing buttons', () => {
  let wrapper
  beforeEach (() => {
    const localVue = createLocalVue()
    wrapper = mount(Footer, {
      localVue, store,
      propsData: {
        isImageUploaded: true,
      }
    })
  })
  it('Click classic button is changing type of filters', async () => {
    jest.spyOn(wrapper.vm, 'onClickBtnClassic')
    await wrapper.find('button.classic-btn').trigger('click');
    expect(wrapper.vm.onClickBtnClassic).toHaveBeenCalled();
  })
  it('Click neural button is changing type of filters', async () => {
    jest.spyOn(wrapper.vm, 'onClickBtnNeural')
    await wrapper.find('button.neural-btn').trigger('click');
    expect(wrapper.vm.onClickBtnNeural).toHaveBeenCalled();
  })
})

describe('Testing buttons', () => {

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
