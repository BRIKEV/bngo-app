import { shallowMount } from '@vue/test-utils';
import { AccessGameForm } from '@/sections';
import i18n from '@/config/tests/i18n';
import localVue from '@/config/tests';

describe('AccessGameForm section', () => {
  const defaultConfig = {
    localVue,
    i18n,
  };
  it('Should not render class ready when user.ready is false', () => {
    const wrapper = shallowMount(AccessGameForm, {
      ...defaultConfig,
      data: () => ({ username: 'pruebadeusername' }),
    });
    expect(wrapper.find('.error').exists()).toBe(true);
  });
});
