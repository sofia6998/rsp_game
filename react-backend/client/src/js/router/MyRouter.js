import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import WaitingPage from "../containers/Waiting_page";
import GamePage from "../containers/GamePage";
import { connect } from "react-redux";
import { gameApi } from "../api";

//навигация по страницам
class MyRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='router'>
                    <Route exact path="/" render={(match) => {
                        const gameID = new URL("http://a/" + match.location.search).searchParams.get('game'); //получение значение параметра gameID из запроса
                        gameApi.joinGame(gameID);
                        return (
                            this.props.gameStarted ?
                                <Redirect to={'/game'}/>
                                : <WaitingPage/>
                        )
                    }}/>
                    <Route path='/game' render={() => {
                        return (
                            this.props.gameStarted ?
                                <GamePage/>
                                : <Redirect to={'/'}/>
                        )
                    }}/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        gameStarted: store.gameState.gameStarted
    };
};

export default connect(mapStateToProps)(MyRouter);