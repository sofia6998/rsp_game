import React, {Component} from 'react';
import GamePlane from "./GamePlane";
import Chat from "./Chat";
import {connect} from "react-redux";
import {Motion, spring} from 'react-motion';

class GamePage extends Component{


    //Motion - анимация словестного результата раунда
    render(){

        return(
        <div id='GamePage'>
            <GamePlane/>
            <Chat/>
            <Motion defaultStyle={{x: this.props.animateText ? 10 : 50, y: this.props.animateText ? 0 : 1}}
                    style={{x: spring(this.props.animateText ? 50 : 10), y: this.props.animateText ? 1 : 0}}>
                {value => <div id='animatedText'
                               style={{fontSize: value.x, opacity: value.y}}>{this.props.animateText}</div>}
            </Motion>

        </div>
        )
    }
}

function mapStateToProp(state) {
    return {
        animateText:state.gameState.animatedResult

    }
}


export default connect(mapStateToProp)(GamePage);