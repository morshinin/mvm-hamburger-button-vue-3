import { mount } from '@vue/test-utils'
import HamburgerButtonVue from '../../lib/HamburgerButton.vue'
import { expect } from 'vitest'

test('mount component', async () => {
    expect(HamburgerButtonVue).toBeTruthy()
})

test('should toggle active class on click', async () => {
    expect(HamburgerButtonVue).toBeTruthy()

    const wrapper = mount(HamburgerButtonVue)

    expect(wrapper.classes()).toContain('HamburgerButton')
    expect(wrapper.classes('-is-not-active')).toBe(true)

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('HamburgerButton')
    expect(wrapper.classes('-is-not-active')).toBe(false)
    expect(wrapper.classes('-is-active')).toBe(true)
})