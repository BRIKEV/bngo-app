import { mount } from '@vue/test-utils';
import { ImageCard } from '@/components';

describe('ImageCard component', () => {
  const propsData = {
    imageUrl: 'urlOfimgae',
  };
  const defaultConfig = {
    propsData,
  };
  it('Should be render correctly', () => {
    const wrapper = mount(ImageCard, defaultConfig);
    expect(wrapper.element).toMatchSnapshot();
  });
});
