"use client";

import { MOVES_ENUM } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import React from "react";

const GameControls = ({ disabled, onMoveSelect }) => {
  return (
    <div>
      <Button onClick={() => onMoveSelect(MOVES_ENUM.ROCK)}>Rock</Button>
      <Button onClick={() => onMoveSelect(MOVES_ENUM.PAPER)}>Paper</Button>
      <Button onClick={() => onMoveSelect(MOVES_ENUM.SCISSORS)}>
        Scissors
      </Button>
    </div>
  );
};

export default GameControls;
