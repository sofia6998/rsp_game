module.exports.Game = class Game {
    constructor(id) {
        this.id = id;
        this.players = {};
        this.isFull = false;
        this.firstID = undefined;
        this.secondID = undefined;
        this.result = undefined;
    }

    //добавление игрока
    addPlayer(player) {
        if (!this.firstID) {
            this.firstID = player.id;
            this.players[player.id] = player;
        } else if (!this.secondID) {
            this.secondID = player.id;
            this.players[player.id] = player;
            this.isFull = true;
        }
    };

    //установка жеста игроку
    setGesture(gesture, id) {
        this.players[id].gesture = gesture;
        if (this.players[this.firstID].gesture
            && this.players[this.secondID].gesture) {
            this.countResult();
        }
    };

    //подсчет результата раунда: в result записыается ID победителя или 2, если ничья
    countResult() {
        let first = this.players[this.firstID].gesture;
        let second = this.players[this.secondID].gesture;
        if (first.num1 - 1 === (second.num1 % 5) || first.num2 - 1 === (second.num2 % 5)) {
            this.result = this.firstID;
        } else if (second.num1 - 1 === (first.num1 % 5) || second.num2 - 1 === (first.num2 % 5)) {
            this.result = this.secondID;
        } else if (first.num1 === second.num1 && first.num2 === second.num2) {
            this.result = 2;
        } else {
            console.log("что-то не так..");
        }
        console.log("результат посчитан " + this.result);

    }

    //восстановление данных в начальное состояние по завершении раунда
    clearGestureStates() {
        this.players[this.firstID].gesture = undefined;
        this.players[this.secondID].gesture = undefined;
        this.result = undefined;
    }

};