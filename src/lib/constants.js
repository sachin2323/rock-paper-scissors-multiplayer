export const PLAYER_ID_KEY = "PLAYER_ID_KEY";
export const PLAYER_NAME = "PLAYER_NAME";
export const GAME_STATE = "GAME_STATE";
export const ALL_PLAYERS = "ALL_PLAYERS";
export const ENGAGED_PLAYERS = "ENGAGED_PLAYERS";
export const LEADER_BOARD = "LEADER_BOARD";

export const GAME_STATE_ENUM = {
  NOT_STARTED: "NOT_STARTED",
  LIVE: "LIVE",
};

export const CONNECTION_ENUM = {
  REQUEST: "REQUEST",
  ACCEPT: "ACCEPT",
  REJECT: "REJECT",
  CANCEL: "CANCEL",
};

export const GAME_EXIT_ENUM = {
  CONNECTION_LOST: "CONNECTION_LOST",
  PLAYER_EXIT: "PLAYER_EXIT",
};

export const MOVES_ENUM = {
  ROCK: { code: "ROCK", imgSrc: "/rock.png", title: "Rock" },
  PAPER: { code: "PAPER", imgSrc: "/paper.png", title: "Paper" },
  SCISSORS: { code: "SCISSORS", imgSrc: "/scissors.png", title: "Scissors" },
};

export const RESULT_ENUM = {
  DRAW: "DRAW",
  PLAYER_WINS: "PLAYER_WINS",
  OPPONENT_WINS: "OPPONENT_WINS",
};

export const Routes = {
  LOBBY: "/lobby",
  GAME_PLAY: "/gameplay",
  HOME: "/",
};

export const ERRORS_ENUM = {
  NAME_ERR: "NAME_ERR",
};
