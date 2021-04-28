import {shallowMount} from '@vue/test-utils'
import InformationBoard from "@/components/common/InformationBoard";

describe('InformationBoardComponent', () => {
    it('RENDER ALL InformationBoardComponent\'s PROPS', () => {
        const data = {
            "address": {
                "street": "xxxx xx xxxxxxx",
                "zipCode": "xxxxx",
                "city": "xxx xxxxxx",
                "state": "xx",
                "country": "xxxx"
            },
            "phone_number": "xxxxxxxxxx",
            "name": "xxxx xxxx"
        }

        const title = 'new message'
        const wrapper = shallowMount(InformationBoard, {
            propsData: {title, detailObject: data}
        })
        expect(wrapper.text()).toMatch(title)
        expect(wrapper.text()).toMatch(data.name)
        expect(wrapper.text()).toMatch(data.address.street)
        expect(wrapper.text()).toMatch(data.address.city)
        expect(wrapper.text()).toMatch(data.address.state)
        expect(wrapper.text()).toMatch(data.address.zipCode)
        expect(wrapper.text()).toMatch(+1 + data.phone_number)
    })
})
