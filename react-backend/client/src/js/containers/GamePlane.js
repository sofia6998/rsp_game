import React from 'react';
import Gestures from '../components/GesturesToChoose';
import Points from '../components/points';
import Result from '../components/result';
import { bindActionCreators } from "redux";
import { selectGesture } from "../actions";
import { connect } from "react-redux";
import { gameApi } from '../api';

//игровое полотно
class GamePlane extends React.Component {

    //обработка нажатия на жест
    handleGesture = (gesture) => {
        if (!this.props.gameState.wait) {
            this.props.selectGesture(gesture);
            gameApi.sendGesture({
                gesture: gesture,
                userID: this.props.gameState.myID,
                gameID: this.props.link
            })
        }
    };

    render() {
        return (
            <div id='GamePlane'>
                <Gestures
                    handleGesture={this.handleGesture}
                />
                <Result/>
                <Points/>
            </div>
        );
    }
}

function matchDispatcherToProps(dispatch) {
    return bindActionCreators({ selectGesture: selectGesture }, dispatch)

}

function mapStateToProp(state) {
    return {
        gameState: state.gameState,
        link: state.link
    }
}

export default connect(mapStateToProp, matchDispatcherToProps)(GamePlane);