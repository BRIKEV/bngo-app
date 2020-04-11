import { shallowMount } from '@vue/test-utils';
import Carrousel from '@/components/Carrousel/Carrousel.vue';

describe('Carrousel component', () => {
  it('Should render a element passed as slot', () => {
    const wrapper = shallowMount(Carrousel, {
      slots: {
        items: '<div class="fake-msg"></div>',
      },
    });
    expect(wrapper.findAll('.fake-msg').length).toBe(1);
  });
});
