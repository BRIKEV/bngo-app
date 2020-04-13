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

  it('Should render a hiddenCard class if image is not selected', () => {
    const wrapper = shallowMount(Board, {
      propsData: {
        ...defaultConfig.propsData,
        allSelected: false,
        images: [{
          id: '1',
          selected: false,
          image: 'url',
        }],
      },
    });
    expect(wrapper.find('.hiddenCard').exists()).toBe(true);
    expect(wrapper.text()).toMatch('?');
  });

  it('Should not render a hiddenCard class if allSelected is true', () => {
    const wrapper = shallowMount(Board, {
      propsData: {
        ...defaultConfig.propsData,
        allSelected: true,
        images: [{
          id: '1',
          selected: false,
          image: 'url',
        }],
      },
    });
    expect(wrapper.find('.hiddenCard').exists()).toBe(true);
  });

  it('Should not render a hiddenCard class if allSelected is false and image is not selected', () => {
    const wrapper = shallowMount(Board, {
      propsData: {
        ...defaultConfig.propsData,
        allSelected: false,
        images: [{
          id: '1',
          selected: false,
          image: 'url',
        }],
      },
    });
    expect(wrapper.find('.hiddenCard').exists()).toBe(true);
  });
});
