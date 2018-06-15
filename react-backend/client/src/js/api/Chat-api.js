import * as actions from '../actions';
import * as types from '../actions/actions-type';
import store from '../../store';

//API для общения чата с сервером
class ChatApi {
    constructor(socket) {
        this.socket = socket;
        this.receive();
    }

    //слушатель на поступающие сообщения
    receive = () => {
        this.socket.on(types.NEW_MSG, (data) => {
            store.dispatch(
                actions.addNewMsg(data)
            )
        })
    };

    //отправка сообщений
    sendMsg = (data) => {
        this.socket.emit(types.SEND_MSG, data);
    };
}

export default ChatApi;