import { shallowMount } from '@vue/test-utils';
import { AccessGameForm } from '@/sections';
import i18n from '@/config/tests/i18n';
import localVue from '@/config/tests';
import router from '@/config/tests/router';

describe('AccessGameForm section', () => {
  const defaultConfig = {
    localVue,
    i18n,
    router,
  };
  it('Should be show a error when the username is longer than 10', () => {
    const wrapper = shallowMount(AccessGameForm, {
      ...defaultConfig,
      data: () => ({ username: 'pruebadeusername' }),
    });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });
  it('Should be invalid when username, roomName and gameKey are not completed', () => {
    const wrapper = shallowMount(AccessGameForm, {
      ...defaultConfig,
      data: () => ({
        username: 'pruebadeusername',
        roomName: 'room 1',
      }),
    });
    expect(wrapper.vm.invalid).toBeTruthy();
  });
  it('Should be invalid when username, roomName and gameKey are completed but username is longer than 10', () => {
    const wrapper = shallowMount(AccessGameForm, {
      ...defaultConfig,
      data: () => ({
        username: 'pruebadeusername',
        roomName: 'room 1',
        gameKey: 'pass 1',
      }),
    });
    expect(wrapper.vm.invalid).toBeTruthy();
  });
  // it('Should invalid be false when username, roomName and gameKey are completed', () => {
  //   const wrapper = shallowMount(AccessGameForm, {
  //     ...defaultConfig,
  //     data: () => ({
  //       username: 'user 1',
  //       roomName: 'room 1',
  //       gameKey: 'pass 1',
  //     }),
  //   });
  //   expect(wrapper.vm.invalid).toBeFalsy();
  // });
  // it('Should fire onAccessClick event when click btn and data is valid', () => {
  //   const wrapper = mount(AccessGameForm, {
  //     ...defaultConfig,
  //     data: () => ({
  //       username: 'user 1',
  //       roomName: 'room 1',
  //       gameKey: 'pass 1',
  //     }),
  //   });
  //   wrapper.find('.btn').trigger('click');
  //   expect(wrapper.emitted('onAccessClick')).toBeTruthy();
  // });
});
