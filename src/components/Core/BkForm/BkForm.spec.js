import { shallowMount } from '@vue/test-utils';
import BkForm from '@/components/Core/BkForm/BkForm.vue';

describe('BkForm component', () => {
  const title = 'New title';
  it('Should show a header when passed props.hasHeader', () => {
    const wrapper = shallowMount(BkForm, {
      propsData: {
        title,
        hasHeader: true,
      },
    });
    expect(wrapper.contains('.header')).toBe(true);
  });
  it('Should render an icon and iconText when passed props.hasHeader', () => {
    const wrapper = shallowMount(BkForm, {
      propsData: {
        title,
        hasHeader: true,
        headerIcon: 'keyboard_arrow_down',
        iconText: 'RETURN',
      },
    });
    expect(wrapper.find('.icon').text()).toBe('keyboard_arrow_down');
    expect(wrapper.find('.iconText').text()).toBe('RETURN');
  });
  it('Should render a element passed as slot', () => {
    const wrapper = shallowMount(BkForm, {
      propsData: {
        title,
      },
      slots: {
        default: '<div class="fake-msg"></div>',
      },
    });
    expect(wrapper.findAll('.fake-msg').length).toBe(1);
  });
});
