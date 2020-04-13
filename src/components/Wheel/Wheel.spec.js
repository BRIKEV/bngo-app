import { shallowMount } from '@vue/test-utils';
import { Wheel } from '@/components';

describe('Wheel component', () => {
  const propsData = {
    images: [{ image: 'test image' }],
    animate: false,
    selected: {
      image: 'image 1',
      name: 'img 1',
    },
  };
  const defaultConfig = {
    propsData,
  };

  it('Should render selectedImage if is not animated', () => {
    const wrapper = shallowMount(Wheel, defaultConfig);
    expect(wrapper.find('.selectedImage').exists()).toBeTruthy();
    expect(wrapper.text()).toMatch(propsData.selected.name);
  });

  it('Should render animate class if is animated', () => {
    const wrapper = shallowMount(Wheel, {
      propsData: {
        ...defaultConfig.propsData,
        animate: true,
      },
    });
    expect(wrapper.find('.animate').exists()).toBeTruthy();
  });
});
