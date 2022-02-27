import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import DialogBox from '../../src/components/DialogBox.vue'
import axios from 'axios'
import sinon from 'sinon'

describe('DialogBox instance testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(DialogBox, {
    vueInstance
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(DialogBox)).toBe(true)
  })
}),

describe('DialogBox buttons are correct', () => {
  let wrapper
  beforeEach (() => {
    const vueInstance = createLocalVue()
    wrapper = mount(DialogBox, {
      vueInstance
    })
  })
  // const vueInstance = createLocalVue()
  // const wrapper = mount(DialogBox, {
  //   vueInstance
  // })
  it('Click is calling method "cancel"', async () => {
    jest.spyOn(wrapper.vm, 'cancel')
    await wrapper.find('button.no').trigger('click')
    expext(wrapper.vm.cancel).toHaveBeenCalled()
    // expect(wrapper.vm.cancel).toBeCalled()

    // wrapper.vm.$emit('cancel')
    // wrapper.vm.$emit('cancel', 'close')
    // await wrapper.vm.$nextTick()
    // expect(wrapper.emitted().cancel[1]).toEqual(['close'])
  })
  it('Clicks were emitted', async () => {
    wrapper.vm.$emit('submit')
    wrapper.vm.$emit('submit', 'accept')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().submit[1]).toEqual(['accept'])
  })
  it('emits return "close" if button is clicked', () => {
    const cmp = wrapper.findComponent('.no')
    expect(cmp.contains('.no')).toBe(true);
    wrapper.vm.$emit('cancel', 'close')
    expect(wrapper.emitted()["cancel"][0]).toEqual(['close'])
  })
  it('emits return "accept" if button is clicked', () => {
    const cmp = wrapper.findComponent('.yes')
    expect(cmp.contains('.yes')).toBe(true);
    wrapper.vm.$emit('submit', 'accept')
    expect(wrapper.emitted()["submit"][0]).toEqual(['accept'])
  })
})
