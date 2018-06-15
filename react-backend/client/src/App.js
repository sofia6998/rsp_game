import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/gamePage.css';
import './styles/myChatStyle.css';
import MyRouter from './js/router/MyRouter';


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to the Game</h2>
                </div>
                <MyRouter/>

            </div>

        );
    }
}

export default App;
