import { mount, shallowMount } from '@vue/test-utils';
import { Board } from '@/components';

describe('Board component', () => {
  const propsData = {
    numOfColumns: 4,
    numOfRows: 4,
  };
  const defaultConfig = {
    propsData,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(Board, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should render a disabled class if image is not selected', () => {
    const wrapper = shallowMount(Board, {
      propsData: {
        images: [{
          image: 'url',
          selected: false,
        }],
      },
    });
    expect(wrapper.find('.disabled').exists()).toBe(true);
  });

  it('Should not render a disabled class if allSelected is true', () => {
    const wrapper = shallowMount(Board, {
      propsData: {
        allSelected: true,
        images: {
          selected: false,
        },
      },
    });
    expect(wrapper.find('.disabled').exists()).toBe(false);
  });
});
