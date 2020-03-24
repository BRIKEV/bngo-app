import { mount } from '@vue/test-utils';
import Board from './Board.vue';

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
});
