import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import FilterItem from '../../src/components/FilterItem.vue'
import flushPromises from 'flush-promises'
import axios from 'axios'

const mockData = [
  {success: true}
]

jest.mock('axios', () => ({
  get: jest.fn(() => mockData)
}))


// const mock = jest.fn()

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

describe('FilterItem testing', () => {
  let wrapper
  const localVue = createLocalVue()
  wrapper = mount(FilterItem, {
    localVue,
    propsData: {
      previewImage: 'candy.jpg',
    }
  })
  it('Click is calling method "onClickFilter"', async () => {
    jest.spyOn(wrapper.vm, 'onClickFilter')
    await wrapper.find('.filter').trigger('click');
    expect(wrapper.vm.onClickFilter).toHaveBeenCalled();
  })

  it('"onClickFilter" is calling "sendFilter"', async () => {
    jest.spyOn(wrapper.vm, 'onClickFilter')
    await wrapper.get('.filter').trigger('click');
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/ping')
    // await flushPromises()
    // expect(wrapper.vm.sendFilter).toHaveBeenCalled();
  })
})


