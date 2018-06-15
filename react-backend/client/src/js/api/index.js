import socketIOClient from "socket.io-client";
import * as config from "./config";
import GameApi from "./Game-api";
import ChatApi from "./Chat-api";
import VideoApi from "./VideoApi";

//инициализация всех API

const address = config.PROTOCOL + "://" + config.HOST + ":" + config.PORT;
let socket = socketIOClient(address);

export let gameApi = new GameApi(socket);
export let chatApi = new ChatApi(socket);
export let videoApi = new VideoApi(socket);