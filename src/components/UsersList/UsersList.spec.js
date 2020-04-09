import { shallowMount } from '@vue/test-utils';
import UsersList from '@/components/UsersList/UsersList.vue';

describe('UsersList component', () => {
  const USER_NOT_READY = 'NOT READY';
  const USER_READY = 'READY';
  it('renders class ready when user.ready is true', () => {
    const usersMock = [
      { username: 'Test1', ready: true },
    ];
    const wrapper = shallowMount(UsersList, {
      propsData: {
        users: usersMock,
      },
    });
    expect(wrapper.find('.ready').exists()).toBeTruthy();
  });
  it('Should not render class ready when user.ready is false', () => {
    const usersMock = [
      { username: 'Test1', ready: false },
    ];
    const wrapper = shallowMount(UsersList, {
      propsData: {
        users: usersMock,
      },
    });
    expect(wrapper.find('.ready').exists()).toBeFalsy();
  });
  it('Should render the username', () => {
    const usersMock = [
      { username: 'Test1', ready: false },
    ];
    const wrapper = shallowMount(UsersList, {
      propsData: {
        users: usersMock,
      },
    });
    expect(wrapper.find('.userName').text()).toEqual(usersMock[0].username);
  });
  it('Should show NOT READY message if user.ready is false', () => {
    const usersMock = [
      { username: 'Test1', ready: false },
    ];
    const wrapper = shallowMount(UsersList, {
      propsData: {
        users: usersMock,
      },
    });
    expect(wrapper.find('.infoMsg').text()).toEqual(USER_NOT_READY);
  });
  it('Should show READY message if user.ready is true', () => {
    const usersMock = [
      { username: 'Test1', ready: true },
    ];
    const wrapper = shallowMount(UsersList, {
      propsData: {
        users: usersMock,
      },
    });
    expect(wrapper.find('.infoMsg').text()).toEqual(USER_READY);
  });
});
