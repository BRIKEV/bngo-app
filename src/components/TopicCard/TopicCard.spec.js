import { shallowMount } from '@vue/test-utils';
import TopicCard from '@/components/TopicCard/TopicCard.vue';

describe('TopicCard component', () => {
  const propsData = {
    title: 'New title',
  };
  const defaultConfig = {
    propsData,
  };
  it('renders required props.title', () => {
    const wrapper = shallowMount(TopicCard, defaultConfig);
    expect(wrapper.text()).toMatch(propsData.title);
  });
  it('Should renders props.description when passed', () => {
    const wrapper = shallowMount(TopicCard, {
      propsData: {
        ...defaultConfig.propsData,
        description: 'desc',
      },
    });
    expect(wrapper.text()).toMatch('desc');
  });
});
