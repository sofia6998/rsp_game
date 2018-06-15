import React, { Component } from 'react';
import { connect } from 'react-redux';

//компонент отображающий результат завершенного раунда
class Results extends Component {
    render() {
        if (!this.props.myGesture) {  //если текущий игрок не выбрал жест
            return (
                <div>
                    <img className="gesture" alt="?"
                         src="/none.png"/>

                    <img className="gesture" alt="?"
                         src="/none.png"/>
                </div>)
        } else if (!this.props.opponentGesture) {   //если выбрал только текущий игрок
            return (
                <div>
                    <img className="gesture" alt={this.props.myGesture.name}
                         src={this.props.myGesture.img}
                         key={this.props.myGesture.id}/>

                    <img className="gesture" alt="?"
                         src="/none.png"/>
                </div>
            )
        }
        return (                          //выбрали оба
            <span>
                <img className="gesture" alt={this.props.myGesture.name}
                     src={this.props.myGesture.img}
                     key={this.props.myGesture.id}/>

                <img className="gesture" alt={this.props.opponentGesture.name}
                     src={this.props.opponentGesture.img}
                     key={this.props.opponentGesture.id+10}/>
            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        myGesture: state.gameState.myGesture,
        opponentGesture: state.gameState.opponentGesture
    }
}

export default connect(mapStateToProps)(Results);