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
  it('initialized correctly', () => {
    const spy = jest.spyOn(wrapper.vm, 'setNewFile')
    wrapper.vm.setNewFile()
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(spy).toHaveBeenCalled()
  })
})
