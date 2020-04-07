import { mount } from '@vue/test-utils';
import BkModal from '@/components/BkModal/BkModal.vue';

describe('BkModal component', () => {
  it('Should be render correctly', () => {
    const wrapper = mount(BkModal);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Should fire close event when click default btn', () => {
    const wrapper = mount(BkModal);
    wrapper.find('.modalDefaultButton').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
