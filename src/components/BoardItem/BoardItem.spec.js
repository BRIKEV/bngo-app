import { mount, shallowMount } from '@vue/test-utils';
import BoardItem from '@/components/BoardItem/BoardItem.vue';

describe('BoardItem component', () => {
  const propsData = {
    image: 'image test',
  };
  const defaultConfig = {
    propsData,
  };

  it('Should be render correctly', () => {
    const wrapper = mount(BoardItem, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should render a disabled class if is not selected', () => {
    const wrapper = shallowMount(BoardItem, {
      propsData: {
        ...defaultConfig.propsData,
        selected: false,
      },
    });
    expect(wrapper.find('.disabled').exists()).toBeTruthy();
  });

  it('Should not render a disabled class if is not selected but enableClick is true', () => {
    const wrapper = shallowMount(BoardItem, {
      propsData: {
        ...defaultConfig.propsData,
        selected: false,
        enableClick: true,
      },
    });
    expect(wrapper.find('.disabled').exists()).toBeFalsy();
  });

  it('Should change isClicked value when click on item', async () => {
    const wrapper = shallowMount(BoardItem, {
      data: () => ({
        isClicked: false,
      }),
      propsData: {
        ...defaultConfig.propsData,
        selected: false,
      },
    });
    wrapper.find('.item').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isClicked).toBeTruthy();
  });

  it('Should render a clicked after click item and enableClick is true', async () => {
    const wrapper = shallowMount(BoardItem, {
      data: () => ({
        isClicked: false,
      }),
      propsData: {
        ...defaultConfig.propsData,
        selected: false,
        enableClick: true,
      },
    });
    wrapper.find('.item').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.clicked').exists()).toBeTruthy();
  });
});
