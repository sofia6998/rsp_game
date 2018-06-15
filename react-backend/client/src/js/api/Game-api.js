import * as types from '../actions/actions-type';
import * as actions from '../actions';
import store from "../../store";

//API для игры
class GameApi {
    constructor(socket) {
        this.socket = socket;
        this.startGame();
        this.roundResult();
        this.noGame();
    }

    //если игра отсутсвует
    noGame =  () => {
        this.socket.on(types.NO_GAME, () =>{
            store.dispatch(
                actions.exitGame()
            )
        })
    };

    //подписка на начало игры
    startGame = () => {
        this.socket.on(types.GAME_START, (data) => {
            store.dispatch(
                actions.startGame(data)
            )
        });
    };

    //попытка присоединиться к игре
    joinGame = (gameID) => {
        this.socket.emit(types.JOIN_GAME, { gameID: gameID });
        this.socket.on(types.GAME_JOINED, (data) => {
            store.dispatch(
                actions.linkCreated(data.gameID)
            )
        })
    };

    //отправка жеста на сервер
    sendGesture = (data) => {
        this.socket.emit(types.GESTURE_SELECTED, data);
    };

    //подсчет результата раунда
    roundResult = () => {
        this.socket.on(types.RESULT_OF_ROUND, (data) => {
            store.dispatch(
                actions.roundResult(data)
            );
            setTimeout(this.newRound.bind(this), 3000); //задержка результата раунда
        });
    };

    //начало нового раунда
    newRound = () => {
        store.dispatch(actions.newRound());
    };

    //запрос на получение ссылки для приглашения
    getGameLink = () => {
        this.socket.emit(types.GET_NEW_LINK);
        this.socket.on(types.LINK_CREATED, (data) => {
            store.dispatch(
                actions.linkCreated(data.gameID)
            )
        })
    };
}

export default GameApi;