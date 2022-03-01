import { createLocalVue, mount } from '@vue/test-utils'
import InfoPicture from '../../src/components/InfoPicture.vue'
import store from '@/store'
// import Vuex from 'vuex'

describe('InfoPicture testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(InfoPicture, {
    vueInstance,
    store
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(InfoPicture)).toBe(true)
  })
})
// it('when photo is uploaded name and resolution are visible', () => {
//   const vueInstance = createLocalVue()
//   vueInstance.use(Vuex)
//   // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
//   const wrapper = mount(InfoPicture, {
//     vueInstance,
//     store
//   })
//   const pictureName = wrapper.findAll('div').at(1).text()
//   const pictureRes = wrapper.findAll('div').at(2).text()
//   expect(wrapper.vm.$options.name).toMatch('InfoPicture')
//   expect(wrapper).toBeTruthy()
//   expect(wrapper.is(InfoPicture)).toBe(true)
//   expect((pictureName).exists()).toBe(true)
//   expect((pictureRes).exists()).toBe(true)
// })
