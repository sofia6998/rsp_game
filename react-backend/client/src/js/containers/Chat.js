import React from 'react';
import Messages from '../components/messages';
import { chatApi } from "../api";
import { connect } from 'react-redux';

//контейнер для чата
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
    }

    //отправка сообщения по нажатию "enter"
    onPressKey = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.onSend();
        }
    };

    //обновление текста в текстовом поле
    onMsgChange = (event) => {
        this.setState({ msg: event.target.value });
    };

    //отправка сообщения
    onSend = () => {
        if (!this.state.msg) {
            return;
        }
        chatApi.sendMsg(
            {
                text: this.state.msg,
                userID: this.props.gameState.myID,
                gameID: this.props.link
            });
        this.setState({ msg: '' });
    };

    render() {
        return (
            <Messages
                onPressKey={this.onPressKey}
                onMsgChange={this.onMsgChange}
                msg={this.state.msg}
                onSend={this.onSend}
            />
        )
    }
}

function mapStateToProp(state) {
    return {
        messages: state.chatState.messages,
        gameState: state.gameState,
        link: state.link
    }
}

export default connect(mapStateToProp)(Chat);