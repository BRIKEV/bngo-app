import { shallowMount, mount } from '@vue/test-utils';
import BkHeader from '@/components/Core/BkHeader/BkHeader.vue';

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
  it('renders props.title when passed', () => {
    const wrapper = shallowMount(BkHeader, {
      slots: {
        default: '<div class="fake-msg"></div>',
      },
    });
    expect(wrapper.findAll('.fake-msg').length).toBe(1);
  });
});
