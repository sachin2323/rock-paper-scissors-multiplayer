"use client";

import React from "react";
import MoveCard from "./MoveCard";

const GameScreen = ({ player, opponent, playerMove, opponentMove }) => {
  return (
    <div>
      {opponentMove.move && (
        <p className="text-base px-2 text-green-500 capitalize">
          {opponent.name} has played
        </p>
      )}
      <MoveCard user={player} move={playerMove?.move} />
    </div>
  );
};

export default GameScreen;
