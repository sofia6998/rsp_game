import store from "../../store";
import * as actions from "../actions/";


class VideoApi {
    constructor(socket) {
        this.socket = socket;
        this.first = false;
        this.callIsOn = false;
        this.inviteMessage = undefined;
        this.myStream = undefined;
        this.pc = undefined;
        this.remoteStream = undefined;
        this.init();
    }
    //подписываемся на сообщения для видео
    init = () => {
        this.socket.on('message-video', this.onMessage);
    };
    //отправляем сообщения
    sendMessage = (message) => {
        this.socket.emit('message-video', message);
    };
    // обработка полученных сообщений
    onMessage = (message) => {
        //для того, кому звонят
        if (message.type === 'invite') {
            this.invite = true;
            this.inviteMessage = message;
            store.dispatch(
                actions.getCall({invite: this.invite})
            );
        } else if (message.type === 'answer' && this.pc) {
            this.pc.setRemoteDescription(new RTCSessionDescription(message));
        } else if (message.type === 'candidate' && this.pc && this.callIsOn) {
            let candidate = new RTCIceCandidate({
                sdpMLineIndex: message.label,
                candidate: message.candidate
            });
            this.pc.addIceCandidate(candidate);
        } else if (message.type === 'bye') {
            this.onRemoteHangup();
        }
    };
    //позвонить
    callUser = () => {
        this.first = true;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
            .then(this.gotStream)
            .catch(function (e) {
                console.log('getUserMedia() error: ' + e.name);
            });
    };
    //принять звонок
    getCallFromUser = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
            .then(this.gotStream)
            .then(this.createConnect)
            .catch(function (e) {
                console.log('getUserMedia() error: ' + e.name);
            });

    };
    //запустить свой стрим
    gotStream = (stream) => {
        this.myStream = stream;
        if (this.first) {
            this.createConnect();
            store.dispatch(
                actions.sendPhoneCall({
                    first: this.first,
                    callIsOn: this.callIsOn,
                    myStream: stream
                })
            );
        }
    };

    //звоним или отвечаем другому пользователю после того, как запустили свой стрим
    createConnect = () => {
        if (!this.callIsOn && typeof this.myStream !== 'undefined') {
            this.createPeerConnection();
            this.pc.addStream(this.myStream);
            this.callIsOn = true;
            this.invite = false;

            if (this.first) {
                this.doCall();
            } else {
                this.doAnswer();
            }
        }
    };
    //создаем подключение
    createPeerConnection = () => {
        try {
            this.pc = new RTCPeerConnection(null);
            this.pc.onicecandidate = this.onIceCandidate;
            this.pc.onaddstream = this.onRemoteStreamAdded;
            this.pc.onremovestream = this.onRemoteStreamRemoved;
            if (this.inviteMessage) {
                this.pc.setRemoteDescription(new RTCSessionDescription(this.inviteMessage));
            }

        } catch (e) {
            //...
        }
    };

    onIceCandidate = (event) => {
        if (event.candidate) {
            this.sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
        }
    };

    onCreateinviteError = (event) => {
        console.log('createinvite() error: ', event);
    }
    //делаем предложение подключиться
    doCall = () => {
        this.pc.createinvite(this.setLocalAndSendMessage, this.onCreateinviteError);
    };
    //отвечаем на предложением подключиться
    doAnswer = () => {
        this.pc.createAnswer().then(
            this.setLocalAndSendMessage
        );
    };

    setLocalAndSendMessage = (sessionDescription) => {
        this.pc.setLocalDescription(sessionDescription);
        this.sendMessage(sessionDescription);
    };


    onRemoteStreamAdded = (event) => {
        this.remoteStream = event.stream;
        store.dispatch(
            actions.startCall({
                callIsOn: this.callIsOn,
                invite: this.invite,
                myStream: this.myStream,
                remoteStream: this.remoteStream,
            })
        );
    };

    onRemoteStreamRemoved = (event) => {
        this.onRemoteHangup();
    };
    //завершаем разговор
    hangup = () => {
        this.end();
        this.sendMessage({type: 'bye'});
    };

    onRemoteHangup = () => {
        this.end();
    };

    end = () => {
        this.callIsOn = false;
        this.invite = undefined;
        this.inviteMessage = undefined;
        this.myStream = undefined;
        this.remoteStream = undefined;
        this.first = false;
        if (this.pc) {
            this.pc.close();
        }
        this.pc = null;
        store.dispatch(
            actions.endCall({
                callIsOn: this.callIsOn,
                invite: this.invite,
                myStream: this.myStream,
                remoteStream: this.remoteStream,
                first: this.first,
            })
        );

    }

}

export default VideoApi;