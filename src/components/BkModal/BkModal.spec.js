import { mount } from '@vue/test-utils';
import BkModal from '@/components/BkModal/BkModal.vue';

describe('BkModal component', () => {
  it('Should be render correctly', () => {
    const wrapper = mount(BkModal);
    expect(wrapper.element).toMatchSnapshot();
  });
});
