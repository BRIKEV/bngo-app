import bgnoActions from './bgnoActions';

describe('Bgno actions', () => {
  it('userBoard action', () => {
    const mockBoard = { board: ['card1'] };
    const commit = jest.fn();
    bgnoActions.userBoard({ commit }, mockBoard);
    expect(commit).toHaveBeenCalledWith('SET_USER_BOARD', ['card1']);
  });
});
