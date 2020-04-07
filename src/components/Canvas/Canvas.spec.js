import { mount, shallowMount } from '@vue/test-utils';
import { Canvas } from '@/components';

describe('Canvas component', () => {
  const propsData = {
    height: 500,
    width: 300,
  };
  const defaultConfig = {
    propsData,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(Canvas, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Should be render height and width', () => {
    const wrapper = shallowMount(Canvas, {
      propsData: {
        ...defaultConfig.propsData,
        className: 'newClass',
      },
    });
    expect(wrapper.classes('newClass')).toBe(true);
  });
});
