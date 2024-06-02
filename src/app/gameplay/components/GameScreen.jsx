"use client";

import React from "react";
import MoveCard from "./MoveCard";

const GameScreen = ({ player, opponent, playerMove, opponentMove }) => {
  return (
    <div>
      {opponentMove.move && (
        <p className="text-lg text-green-400 capitalize">
          {opponent.name} has played his move
        </p>
      )}
      <MoveCard user={player} move={playerMove?.move} />
    </div>
  );
};

export default GameScreen;
