import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

//компонент текстового чата
class Messages extends Component {

    //отображение всех сообщений из хранилища
    showMessages() {
        let i = 0;
        return this.props.messages.map((msg) => {
            return (
                <div className={msg.userID === this.props.you ? "yourMsg" : "hisMsg"} key={i++}>{msg.text}</div>
            )
        });
    };

    render() {
        return (
            <div id='chatContainer'>
                <div id='messages'>
                    <Scrollbars>
                        {this.showMessages()}
                    </Scrollbars>
                </div>
                <div id='newMsgForm'>
                    <input id='textMsg' type="text" value={this.props.msg} onKeyPress={this.props.onPressKey}
                           onChange={this.props.onMsgChange}/>
                    <button id='msgBtn' onClick={this.props.onSend} value="Submit">отправить</button>
                </div>
            </div>
        )
    }

}

function mapStateToProp(state) {
    return {
        messages: state.chatState.messages,
        you: state.gameState.myID
    }
}

export default connect(mapStateToProp)(Messages);