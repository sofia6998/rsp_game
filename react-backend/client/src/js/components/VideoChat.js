import React, { Component } from 'react';
import { connect } from 'react-redux';


//текстовый чат
class VideoChat extends Component {
       // let video = document.querySelector('video');
        //video.srcObject = stream;
    render() {
        return (
            <div id='VideoChat'>
                <video id="localVideo" autoPlay/>
                <video id="remoteVideo" autoPlay/>
                <button onClick={this.props.call}>call</button>
                <button onClick={this.props.answer}>answer</button>
                <button onClick={this.props.hangUp}>hang up</button>

            </div>
        )

    }

}
//
// function mapStateToProp(state) {
//     return {
//         video: state.videoState,
//     }
// }
//

export default connect(mapStateToProp)(VideoChat);