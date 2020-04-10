import { mount } from '@vue/test-utils';
import { JoinGameSection } from '@/sections';
import i18n from '@/config/tests/i18n';
import localVue from '@/config/tests';

describe('CreateGameForm section', () => {
  const defaultConfig = {
    localVue,
    i18n,
  };
  it('Should fire onAccess event when click accessBtn', () => {
    const wrapper = mount(JoinGameSection, defaultConfig);
    wrapper.find('.accessBtn').trigger('click');
    expect(wrapper.emitted('onAccess')).toBeTruthy();
  });
  it('Should fire onCreateRoom event when click createBtn', () => {
    const wrapper = mount(JoinGameSection, defaultConfig);
    wrapper.find('.createBtn').trigger('click');
    expect(wrapper.emitted('onCreateRoom')).toBeTruthy();
  });
});
