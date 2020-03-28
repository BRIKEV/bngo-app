import { mount, shallowMount } from '@vue/test-utils';
import BkButton from '@/components/BkButton/BkButton.vue';

describe('BkButton component', () => {
  it('Should be render correctly', () => {
    const wrapper = mount(BkButton);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Should has outline class', () => {
    const wrapper = shallowMount(BkButton, {
      propsData: { outline: true },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
