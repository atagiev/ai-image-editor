import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import FilterItem from '../../src/components/FilterItem.vue'
import axios from 'axios'

describe('FilterItem testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = shallowMount(FilterItem, {
    vueInstance,
    propsData: {
      previewImage: 'candy.jpg',
    }
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(FilterItem)).toBe(true)
  })
})