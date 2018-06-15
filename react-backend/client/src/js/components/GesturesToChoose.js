import React, { Component } from 'react';
import { connect } from 'react-redux';

//компонент выбора жеста
class Gestures extends Component {
    //отображение всех жестов из хранилища
    showGestures() {
        return this.props.gestures.map((gesture) => {
            return (
                <img className="gesture" alt={gesture.name} src={gesture.img} key={gesture.id}
                     onClick={this.props.handleGesture.bind(null, gesture)}/>
            );
        });
    }

    render() {
        return (
            <div>
                {this.showGestures()}
            </div>
        )
    }
}

function mapStateToProp(state) {
    return {
        gestures: state.gestures
    }
}


export default connect(mapStateToProp)(Gestures);
