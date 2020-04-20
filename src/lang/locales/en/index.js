export default {
  dashboard: {
    title: 'BNGO',
  },
  userBoardSection: {
    info: 'Draw on your board',
    mobileInfo: 'Click in your board',
  },
  boardSection: {
    title: 'Last results',
    subtitle: '{total} left',
  },
  chatSection: {
    placeholder: 'Write a message... (Max {maxLengthMessage})',
  },
  gameActionsSection: {
    title: 'USERS',
    start: 'START',
    bingo: 'BINGO',
    userList: {
      readyMsg: 'READY',
      notReadyMsg: 'NOT READY',
    },
  },
  joinGame: {
    title: 'BNGO',
    btnAccess: 'Access',
    btnCreate: 'Create',
    accessGameSection: {
      btnAccess: 'PLAY',
      nameLabel: 'Room name',
      passwordLabel: 'Room password',
    },
    createGameSection: {
      typesTitle: 'Select at least one type of board to play',
      shareMessage: 'Your game has been created. Share it with your friends.',
      types: {
        standard: {
          title: 'STANDARD',
          description: 'Traditional bingo with numbers',
        },
        cars: {
          title: 'CARS',
          description: 'Bingo of cars',
        },
        springfield: {
          title: 'SPRINGFIELD',
          description: 'Bingo with pictures of your favorite neighbors',
        },
        movieCartoons: {
          title: 'MOVIE CARTOONS',
          description: 'Bingo with movie cartoons pictures',
        },
      },
      btnCreate: 'Create game',
      usernamelabel: 'Username',
      shareTitle: 'Share your BNGO game',
      shareButtonMobile: 'Share your game',
      shareButtonDesktop: 'Copy your URL',
    },
  },
  notification: {
    titleSuccess: 'SUCCESS',
    titleError: 'ERROR',
    createGameError: 'There\'s already a game with that name',
    accessGameError404: 'There is no room with that name',
    accessGameError409: 'There\'s already someone playing this game',
    errorBingo: 'You don\'t have bingo, keep playing :)',
    linkCopied: 'Copy to clipboard',
    userLeaves: 'User {username} leaves the game',
  },
  modal: {
    message: 'The winner is',
    btn: 'Create a new game',
    social: {
      title: 'BNGO Game',
      message: '{winner} has won a bngo game',
      url: 'https://www.mybngo.com',
    },
  },
  validations: {
    usernameLength: 'The user cannot have more than 10 characters',
  },
};
