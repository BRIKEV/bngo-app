import { shallowMount, mount } from '@vue/test-utils';
import BkHeader from '@/components/BKHeader/BkHeader.vue';

describe('BkHeader component', () => {
  it('renders props.title when passed', () => {
    const title = 'New title';
    const wrapper = shallowMount(BkHeader, {
      propsData: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
  it('Should be render correctly', () => {
    const wrapper = mount(BkHeader);
    expect(wrapper.element).toMatchSnapshot();
  });
});
