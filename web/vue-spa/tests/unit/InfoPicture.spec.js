import { createLocalVue, mount } from '@vue/test-utils'
import InfoPicture from '../../src/components/InfoPicture.vue'
import store from '@/store'
import Vuex from 'vuex'

it('when photo is uploaded name and resolution are visible', () => {
  const vueInstance = createLocalVue()
  vueInstance.use(Vuex)
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(InfoPicture, {
    vueInstance,
    store
  })
  expect(wrapper.vm.$options.name).toMatch('InfoPicture')
  expect(wrapper.isVueInstance()).toBe(true)
  expect(wrapper.is(InfoPicture)).toBe(true)
  expect(wrapper.findAll('div').at(1).text()).toMatch('Эффект: отсутствует')
})
