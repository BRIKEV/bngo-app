import { initialState, mutations } from './bgnoStore';

describe('Tickets store', () => {
  const state = { ...initialState };

  it('set board correctly', () => {
    const mockIBoard = ['board1', 'board2'];
    expect(state.board).toEqual(initialState.board);
    mutations.SET_BOARD(state, mockIBoard);
    expect(state.board).toEqual(mockIBoard);
  });

  it('set user board correctly', () => {
    const mockUserBoard = ['item1', 'item2'];
    expect(state.userBoard).toEqual(initialState.userBoard);
    mutations.SET_USER_BOARD(state, mockUserBoard);
    expect(state.userBoard).toEqual(mockUserBoard);
  });

  it('set current result correctly', () => {
    const selected = {
      image: 'image.png',
      name: 'Name of image',
    };
    expect(state.currentResult).toEqual(initialState.currentResult);
    mutations.SET_SELECTED_RESULT(state, selected);
    expect(state.currentResult.selected).toEqual(selected);
  });

  it('Clean store correctly', () => {
    mutations.SET_BOARD(state, ['board1', 'board2']);
    mutations.SET_ANIMATE(state, true);
    expect(state).not.toEqual(initialState);
    mutations.CLEAN(state);
    expect(state).toEqual(initialState);
  });

  it('set users correctly', () => {
    const mockUsers = [
      { name: 'Test1', ready: false },
      { name: 'Test2', ready: true },
    ];
    expect(state.users).toEqual(initialState.users);
    mutations.SET_USERS(state, mockUsers);
    expect(state.users).toEqual(mockUsers);
  });

  it('set gameTypes correctly', () => {
    const mockGameTypes = [
      {
        title: 'title test',
        description: 'test description',
      },
    ];
    expect(state.gameTypes).toEqual(initialState.gameTypes);
    mutations.SET_GAME_TYPES(state, mockGameTypes);
    expect(state.gameTypes).toEqual(mockGameTypes);
  });
});
