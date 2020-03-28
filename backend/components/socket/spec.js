
// Event List
// 1. On connection event on('connection') we must receive socket handshake with
// socket.handshake.query.room, socket.handshake.query.username, socket.handshake.query.key
// this will call our method joinGame and then send an event or if there is no room error event

// 2. After join to one group we will send an event of user connected event emit('user connected')
// this will send the username and the boardgame
// also this should join that socket to that room

// 3. Users click start game and we receive on('start game') we called our store and save it
// for each user. Receive if game start or not.

// 4. If game starts we send event emit('game ready') envio todo el juego and we start drawing events

// 5. each draw will send info of the game

// 6. Bingo event will stop game and check if there is bingo if not error just to the user

// 7. success event when bingo is okay
