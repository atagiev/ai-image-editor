import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import FilterItem from '../../src/components/FilterItem.vue'
import flushPromises from 'flush-promises'
import axios from 'axios'
import Vuex from 'vuex'
import store from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('axios')

const mockData = [
  {success: true}
]
const mockDataPost = [
  {h: 40, w: 40}
]

// jest.mock('axios', () => ({
//   get: jest.fn(() => mockData),
//   post: jest.fn(() => mockDataPost)
// }))

const file = {
  name: 'image.jpg',
  size: 50000,
  type: 'image/jpg'
}

describe('FilterItem testing', () => {
  const vueInstance = createLocalVue()
  const wrapper = shallowMount(FilterItem, {
    vueInstance,
    propsData: {
      previewImage: 'candy.jpg',
    }
  })
  it('initialized correctly', () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(FilterItem)).toBe(true)
  })
})

describe('FilterItem testing', () => {
  let wrapper
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

describe('FilterItem testing vuex', () => {
  let actions
  let store
  let wrapper
  actions = {
    changeLoading: jest.fn(),
    actionInput: jest.fn()
  }
  store = new Vuex.Store({
    actions
  })
  wrapper = mount(FilterItem, {
    localVue,
    store,
    propsData: {
      previewImage: 'candy.jpg',
    }
  })


  // it('initialized correctly', () => {
  //   jest.spyOn(wrapper.vm, 'sendFilter');
  //   wrapper.vm.sendFilter();
  //   expect(actions.changeLoading).toHaveBeenCalled();
  // })
})

describe('FilterItem testing axios', () => {
  const wrapper = mount(FilterItem, {
    localVue,
    store,
    propsData: {
      previewImage: 'candy.jpg',
    }
  })
  // const responseGet = {
  //   data:
  //   {
  //     success: true
  //   }
  // }
  const responseGet = {
    data:
    {
      id: 5
    }
  }
  it('Testing axios post"', async () => {
    const filter = 'kek'
    const formData = new FormData()
    formData.append('filter_name', filter)
    formData.append('image', file)
    jest.spyOn(wrapper.vm, 'sendFilter')
    wrapper.vm.sendFilter();
    axios.post.mockImplementationOnce(() => Promise.resolve(responseGet))
    // axios.post.mockResolvedValue(responseGetSize)
    expect(axios.post).toHaveBeenCalled()
    // expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/', formData)
  })
  it('Testing axios get"', async () => {
    jest.spyOn(wrapper.vm, 'sendFilter')
    axios.get.mockResolvedValue(file)
    expect(axios.get).toHaveBeenCalled()
    // expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/ping')
  })
  // it('"Testing axios get"', async () => {

  // })
})
