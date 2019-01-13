import Vue from 'vue'
import EmployeeComponent from '@/components/EmployeeComponent'

describe('EmployeeComponent.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(EmployeeComponent)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Employee Dashboard')
  })
})
