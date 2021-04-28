import {shallowMount} from '@vue/test-utils'
import Statistics from "@/components/common/Statistics";

describe('StatisticsComponent', () => {
    it('RENDER ALL StatisticsComponent\'s PROPS', () => {
        const data = {
            label: 'Total Orders',
            count: '254',
            icon: 'doller-sign'
        }

        const wrapper = shallowMount(Statistics, {
            propsData: {...data}
        })
        expect(wrapper.text()).toMatch(data.label)
        expect(wrapper.text()).toMatch(data.count)
        expect(wrapper.find('font-awesome-icon')).toBeTruthy()
    })
})
