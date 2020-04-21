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
    subtitle: 'Quedan {total}',
  },
  chatSection: {
    placeholder: 'Escribe un mensaje... (Max {maxLengthMessage})',
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
      shareMessage: 'Your game has been created. Share it with your friends.',
      types: {
        standard: {
          title: 'TRADICIONAL',
          description: 'Tablero tradicional con números',
        },
        cars: {
          title: 'COCHES',
          description: 'Tablero con fotos de coches',
        },
        springfield: {
          title: 'SPRINGFIELD',
          description: 'Tablero con las imágenes de tus vecinos favoritos',
        },
        movieCartoons: {
          title: 'ANIMACIÓN',
          description: 'Tablero con imágenes de películas de animación',
        },
      },
      btnCreate: 'Crear partida',
      usernamelabel: 'Usuario',
      shareTitle: 'Comparte tu partida de BNGO',
      shareButtonMobile: 'Comparte tu partida',
      shareButtonDesktop: 'Copia tu URL',
    },
  },
  notification: {
    titleSuccess: 'SUCCESS',
    titleError: 'ERROR',
    createGameError: 'Ya existe una partida con ese nombre',
    accessGameError404: 'No existe una sala con ese nombre',
    accessGameError409: 'Ya hay alguien jugando a esta partida',
    accessGameError400: 'El usuario ya existe',
    errorBingo: 'No tienes bingo, sigue jugando :)',
    linkCopied: 'Copiada en portapapeles',
    userLeaves: 'El usuario {username} abandonó la partida',
  },
  modal: {
    message: 'El ganador es',
    btn: 'Salir',
    playAgain: 'Jugar otra vez',
    social: {
      title: 'BNGO Game',
      message: '{winner} ganó una partida en bngo',
      url: 'https://www.mybngo.com',
    },
  },
  validations: {
    usernameLength: 'El usuario no puede tener más de 10 caracteres',
  },
};
