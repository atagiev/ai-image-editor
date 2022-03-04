import { createLocalVue, mount } from '@vue/test-utils'
import FiltersList from '../../src/components/FiltersList.vue'
import axios from 'axios'

describe('FiltersList testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(FiltersList, {
    vueInstance
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(FiltersList)).toBe(true)
  })
  it('initialized correctly', () => {
    const spy = jest.spyOn(wrapper.vm, 'onChangeModal')
    // jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.onChangeModal(true, 'errorText', 'error')
    expect(wrapper.emitted().onChangeModal).toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })
})
