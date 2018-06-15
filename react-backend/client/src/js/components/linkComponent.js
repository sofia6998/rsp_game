import React, { Component } from 'react';
import { gameApi } from '../api';
import { connect } from "react-redux";

//в зависимости от контекста отображает кнопку для получения ссылки или готовую ссылку
class LinkComponent extends Component {
    //запрос на создание ссылки
    createLink = () => {
        gameApi.getGameLink();
    };

    render() {
        if (!this.props.myLink) {
            return (
                <button id='inviteBtn' onClick={this.createLink} value="Submit">Получить ссылку</button>
            )
        }
        let theLink = "http://localhost:3000/?game=" + this.props.myLink;
        return (
            <a href={theLink}>{theLink}</a>
        )
    }
}

function mapStateToProp(state) {
    return {
        myLink: state.link
    }
}

export default connect(mapStateToProp)(LinkComponent);