import { MOVES_ENUM, RESULT_ENUM } from "@/lib/constants";

const moveCalculation = (playerMove, opponentMove) => {
  if (
    playerMove === MOVES_ENUM.SCISSORS.code &&
    opponentMove === MOVES_ENUM.SCISSORS.code
  ) {
    return RESULT_ENUM.DRAW;
  }
  if (
    playerMove === MOVES_ENUM.PAPER.code &&
    opponentMove === MOVES_ENUM.PAPER.code
  ) {
    return RESULT_ENUM.DRAW;
  }
  if (
    playerMove === MOVES_ENUM.ROCK.code &&
    opponentMove === MOVES_ENUM.ROCK.code
  ) {
    return RESULT_ENUM.DRAW;
  }
  if (
    playerMove === MOVES_ENUM.ROCK.code &&
    opponentMove === MOVES_ENUM.SCISSORS.code
  ) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (
    playerMove === MOVES_ENUM.SCISSORS.code &&
    opponentMove === MOVES_ENUM.PAPER.code
  ) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (
    playerMove === MOVES_ENUM.PAPER.code &&
    opponentMove === MOVES_ENUM.ROCK.code
  ) {
    return RESULT_ENUM.PLAYER_WINS;
  }
  if (
    opponentMove === MOVES_ENUM.ROCK.code &&
    playerMove === MOVES_ENUM.SCISSORS.code
  ) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
  if (
    opponentMove === MOVES_ENUM.SCISSORS.code &&
    playerMove === MOVES_ENUM.PAPER.code
  ) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
  if (
    opponentMove === MOVES_ENUM.PAPER.code &&
    playerMove === MOVES_ENUM.ROCK.code
  ) {
    return RESULT_ENUM.OPPONENT_WINS;
  }
};

export const gameEngine = (player, opponent) => {
  console.log(player, opponent);
  const result = moveCalculation(player.move, opponent.move);
  return result;
};
