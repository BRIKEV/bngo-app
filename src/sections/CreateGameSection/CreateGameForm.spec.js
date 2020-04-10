import { shallowMount, mount } from '@vue/test-utils';
import { CreateGameForm } from '@/sections';
import i18n from '@/config/tests/i18n';
import localVue from '@/config/tests';

describe('CreateGameForm section', () => {
  const defaultConfig = {
    localVue,
    i18n,
  };
  it('Should not be invalid when roomName and gameKey are completed', () => {
    const wrapper = shallowMount(CreateGameForm, {
      ...defaultConfig,
      data: () => ({
        gameKey: 'key 1',
        roomName: 'room 1',
      }),
    });
    expect(wrapper.vm.invalid).toBeFalsy();
  });
  it('Should be invalid when roomName or gameKey are not completed', () => {
    const wrapper = shallowMount(CreateGameForm, {
      ...defaultConfig,
      data: () => ({
        gameKey: 'key 1',
      }),
    });
    expect(wrapper.vm.invalid).toBeTruthy();
  });
  it('Should fire onCreateClick event when click btn and data is valid', () => {
    const wrapper = mount(CreateGameForm, {
      ...defaultConfig,
      data: () => ({
        gameKey: 'key 1',
        roomName: 'room 1',
      }),
    });
    wrapper.find('.btn').trigger('click');
    expect(wrapper.emitted('onCreateClick')).toBeTruthy();
  });
});