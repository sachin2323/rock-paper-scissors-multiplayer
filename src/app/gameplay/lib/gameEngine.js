import { MOVES_ENUM, RESULT_ENUM } from "@/app/lib/constants";

const moveCalculation = (playerMove, opponentMove) => {
  if (
    playerMove === MOVES_ENUM.SCISSORS &&
    opponentMove === MOVES_ENUM.SCISSORS
  ) {
    return RESULT_ENUM.DRAW;
  }
  if (playerMove === MOVES_ENUM.PAPER && opponentMove === MOVES_ENUM.PAPER) {
    return RESULT_ENUM.DRAW;
  }
  if (playerMove === MOVES_ENUM.ROCK && opponentMove === MOVES_ENUM.ROCK) {
    return RESULT_ENUM.DRAW;
  }
  if (playerMove === MOVES_ENUM.ROCK && opponentMove === MOVES_ENUM.SCISSORS) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (playerMove === MOVES_ENUM.SCISSORS && opponentMove === MOVES_ENUM.PAPER) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (playerMove === MOVES_ENUM.PAPER && opponentMove === MOVES_ENUM.ROCK) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (opponentMove === MOVES_ENUM.ROCK && playerMove === MOVES_ENUM.SCISSORS) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
  if (opponentMove === MOVES_ENUM.SCISSORS && playerMove === MOVES_ENUM.PAPER) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
  if (opponentMove === MOVES_ENUM.PAPER && playerMove === MOVES_ENUM.ROCK) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
};

export const gameEngine = (player, opponent) => {
  console.log(player, opponent);
  const result = moveCalculation(player.move, opponent.move);
  return result;
};
