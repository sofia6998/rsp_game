const express = require('express');
let app = express();

const http = require('http');
const socketIo = require('socket.io');
const config = require('./config.json');
const uuidv1 = require('uuid/v1');

const gameApi = require('./api/Game');

//константы типов запросов
const CREATE_GAME = 'create game';
const GAME_CREATED = 'link created';
const CONNECTION = 'connection';
const NEW_MSG = 'new message';
const JOIN_GAME = 'join game';
const GESTURE = 'gesture selected';
const DISCONNECT = 'disconnect';
const RECEIVE_MSG = 'receive msg';
const NO_ROOM = 'no room';
const GAME_FULL = 'game full';
const GAME_JOINED = 'game joined';
const GAME_START = 'game start';
const RESULT_OF_ROUND = 'result of round';
const NO_GAME = 'no game';
const MESSAGE_VIDEO = 'message-video';


const VIDEO_MSG = 'video msg';
const ICE_CANDIDATE = 'ice candidate';
const ANSWER = 'video answered';
const HANG_UP = 'hang up';
const INCOME_CALL = 'income call';


//установка порта
const port = config.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log('Listening on port' + port));

//массив игр
let games = {};

const mySocketIo = socketIo(server);

//подписываемся на события
mySocketIo.on(CONNECTION, socket => {
    socket.on(CREATE_GAME, createGame);
    socket.on(JOIN_GAME, tryToJoin);
    socket.on(GESTURE, handleGesture);
    socket.on(RECEIVE_MSG, translateMsg);
    socket.on(DISCONNECT, handleDisconnect);

    socket.on(MESSAGE_VIDEO, sendVideoMessage);

    socket.on(ANSWER, answer);
    socket.on(INCOME_CALL, income);
    socket.on(HANG_UP, hangUp);
    socket.on(ICE_CANDIDATE, onIceCandidate);

});


//создание игры
function createGame() {
    const socket = this;
    let gameID = uuidv1();  //генерация рандомного ключа
    let game = new gameApi.Game(gameID);
    let player = {};
    player.id = socket.id;
    player.score = 0;
    player.gesture = undefined;
    game.addPlayer(player);

    games[gameID] = game;
    socket.join(gameID);
    socket.emit(GAME_CREATED, { gameID: gameID });

}

//попытка присоединиться к игре
function tryToJoin(data) {
    const socket = this;
    let { gameID } = data;
    let game = games[gameID];
    if (!game) {
        socket.emit(NO_ROOM);
        return;
    }
    if (game.count >= 2) {
        socket.emit(GAME_FULL);
        return;
    }
    let player = {};
    player.id = socket.id;
    player.gesture = undefined;
    game.addPlayer(player);
    games[gameID] = game;
    socket.join(gameID);
    socket.emit(GAME_JOINED, { gameID: gameID });
    if(game.isFull) {
        mySocketIo.to(game.firstID).emit(GAME_START, {myID: game.firstID, hisID: game.secondID});
        mySocketIo.to(game.secondID).emit(GAME_START, {myID: game.secondID, hisID: game.firstID});
    }else{
        createGame();
    }

}

//обработка отключения клиента
function handleDisconnect() {
    const socket = this;
    let id = socket.id;
    for(let gamee in games){
        let game = games[gamee];
        if(game.firstID===id || game.secondID===id){
            mySocketIo.to(game.id).emit(NO_GAME);
            delete games[game.id];
        }
    }
}

//обработка выбранного жеста
function handleGesture(data) {
    let game = games[data.gameID];
    let gesture = data.gesture;
    game.setGesture(gesture, data.userID);
    if (game.result === 2) {  //в случае ничьей
        mySocketIo.to(data.gameID).emit(RESULT_OF_ROUND, {
            winner: undefined
        });
        game.clearGestureStates();
    } else if (game.result) {

        mySocketIo.to(data.gameID).emit(RESULT_OF_ROUND, {
            winner: game.result,
            winG: game.players[game.result].gesture,
            looseG: game.players[(game.firstID === game.result) ? game.secondID : game.firstID].gesture
        });
        game.clearGestureStates();

    }

}

//отправка сообщений всем игрокам в данной игре
function translateMsg(data) {
    mySocketIo.to(data.gameID).emit(NEW_MSG, data);
}





function sendVideoMessage(message) {
    let socket = this;
    for (let i in socket.rooms) {
        if (socket.rooms.hasOwnProperty(i)) {
            if (i !== socket.id) {
                socket.to(i).broadcast.emit(MESSAGE_VIDEO, message);
                break;
            }
        }
    }
}


module.exports = app;
