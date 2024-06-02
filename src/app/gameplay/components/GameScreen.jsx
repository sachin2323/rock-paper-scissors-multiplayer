"use client";

import React from "react";
import MoveCard from "./MoveCard";
import ScoreBoard from "./ScoreBoard";

const GameScreen = ({ player, opponent, playerMove, opponentMove }) => {
  return (
    <div>
      <ScoreBoard opponent={opponent} player={player} />
      {opponentMove.move && <p>{opponent.name} has played his move</p>}
      <MoveCard user={player} move={playerMove?.move} />
    </div>
  );
};

export default GameScreen;
