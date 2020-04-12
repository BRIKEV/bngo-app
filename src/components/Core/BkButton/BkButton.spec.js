import { mount, shallowMount } from '@vue/test-utils';
import BkButton from '@/components/Core/BkButton/BkButton.vue';
import localVue from '@/config/tests';

describe('BkButton component', () => {
  const defaultConfig = {
    localVue,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(BkButton, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Should has outline class', () => {
    const wrapper = shallowMount(BkButton, {
      ...defaultConfig,
      propsData: { outline: true },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
