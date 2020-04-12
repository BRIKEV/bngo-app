export default {
  dashboard: {
    title: 'BINGO',
  },
  userBoardSection: {
    info: 'Dibuja sobre tu tablero',
    mobileInfo: 'Haz click en tu tablero',
  },
  boardSection: {
    title: 'Últimos resultados',
  },
  gameActionsSection: {
    title: 'USUARIOS',
    start: 'JUGAR',
    bingo: 'BINGO',
    userList: {
      readyMsg: 'LISTO',
      notReadyMsg: 'PENDIENTE',
    },
  },
  joinGame: {
    title: 'BNGO',
    btnAccess: 'Acceder',
    btnCreate: 'Crear',
    accessGameSection: {
      btnAccess: 'JUGAR',
      nameLabel: 'Nombre de la sala',
      passwordLabel: 'Contraseña de la sala',
    },
    createGameSection: {
      typesTitle: 'Seleccione al menos un tipo de tablero para jugar',
      types: {
        standard: 'Bingo tradicional con números',
        default: 'Bingo de los shavales',
        cars: 'Tablero con fotos de coches',
        springfield: 'Juega al bingo con las imágenes de tus vecinos favoritos',
      },
      btnCreate: 'Crear partida',
      usernamelabel: 'Usuario',
    },
  },
  notification: {
    titleSuccess: 'SUCCESS',
    titleError: 'ERROR',
    createGameError: 'Ya existe una partida con ese nombre',
    accessGameError: 'No existe una sala con ese nombre',
    errorBingo: 'No tienes bingo, sigue jugando :)',
  },
  modal: {
    message: 'El ganador es',
    btn: 'Jugar otra vez',
  },
  validations: {
    usernameLength: 'El usuario no puede tener más de 10 caracteres',
  },
};
