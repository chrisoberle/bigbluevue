import Vue from 'vue'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Big Blue Vue')
    expect(vm.$el.querySelector('.lead').textContent)
      .to.equal('Full Stack Coding Challenge with Vue.js')
  })
})
