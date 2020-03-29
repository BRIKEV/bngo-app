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
    const mockCurrentResult = {
      animate: false,
      selected: {
        image: 'image.png',
        name: 'Name of image',
      },
    };
    expect(state.currentResult).toEqual(initialState.currentResult);
    mutations.SET_CURRENT_RESULT(state, mockCurrentResult);
    expect(state.currentResult).toEqual(mockCurrentResult);
  });
});
