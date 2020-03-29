import { mount } from '@vue/test-utils';
import BkInput from '@/components/BkInput/BkInput.vue';

describe('BkInput component', () => {
  it('Should be render correctly', () => {
    const wrapper = mount(BkInput);
    expect(wrapper.element).toMatchSnapshot();
  });
});
