import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import DialogBox from '../../src/components/DialogBox.vue'
import axios from 'axios'

describe('DialogBox testing', () => {
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
})