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
      typesTitle: 'Seleccione al menos un tipo de tablero para jugar',
      shareMessage: 'Tu partida ha sido creada. Compártela con tus amigos.',
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
    accessGameError: 'there is no room with that name',
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
