import React, { Component } from 'react';
import { connect } from 'react-redux';

//компонент отображения очков
class Points extends Component {
    render() {
        return (
                <h2 id='points'>{this.props.myScore}:{this.props.opponentScore}</h2>
        )
    }
}

function mapStateToProp(state) {
    return {
        myScore: state.gameState.myScore,
        opponentScore: state.gameState.hisScore
    }
}


export default connect(mapStateToProp)(Points);