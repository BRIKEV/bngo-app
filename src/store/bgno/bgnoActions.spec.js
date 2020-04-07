import bgnoActions from './bgnoActions';

describe('Bgno actions', () => {
  const commit = jest.fn();
  it('userBoard action', () => {
    const mockBoard = { board: ['card1'] };
    bgnoActions.userBoard({ commit }, mockBoard);
    expect(commit).toHaveBeenCalledWith('SET_USER_BOARD', ['card1']);
  });

  it('totalBoard action', () => {
    const board = ['card1', 'card2', 'card2'];
    const mockTotalBoard = { board };
    bgnoActions.totalBoard({ commit }, mockTotalBoard);
    expect(commit).toHaveBeenCalledWith('SET_BOARD', board);
  });

  it('optionSelected action', () => {
    const optionSelected = { name: 'option 1', image: 'image' };
    const board = ['card1', 'card2', 'card2'];
    const mockSelected = { board, optionSelected };
    bgnoActions.optionSelected({ commit }, mockSelected);
    expect(commit).toHaveBeenCalledWith('SET_SELECTED_RESULT', optionSelected);
    expect(commit).toHaveBeenCalledWith('SET_BOARD', board);
  });

  it('userInfo action', () => {
    const mockUserInfo = { username: 'test', ready: true };
    bgnoActions.userInfo({ commit }, mockUserInfo);
    expect(commit).toHaveBeenCalledWith('SET_USER_INFO', mockUserInfo);
  });

  it('activateAnimate action', () => {
    bgnoActions.activateAnimate({ commit });
    expect(commit).toHaveBeenCalledWith('SET_ANIMATE', true);
  });

  it('clean action', () => {
    bgnoActions.clean({ commit });
    expect(commit).toHaveBeenCalledWith('CLEAN');
  });
});
