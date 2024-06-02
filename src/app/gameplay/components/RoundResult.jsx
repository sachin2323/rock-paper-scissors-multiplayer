import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { RESULT_ENUM } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import MoveCard from "./MoveCard";

const RoundResult = ({
  result,
  onNextRound,
  player,
  opponent,
  playerMove,
  opponentMove,
}) => {
  return (
    <Dialog open={!!result}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Result</DialogTitle>
          <DialogDescription>
            <div className="flex justify-around items-center mt-3">
              <MoveCard user={player} move={playerMove?.move} />
              <MoveCard user={opponent} move={opponentMove?.move} />
            </div>

            {result === RESULT_ENUM.DRAW && (
              <p className="mt-5 text-2xl">Draw</p>
            )}
            {result === RESULT_ENUM.PLAYER_WINS && (
              <p className="mt-5 text-2xl text-green-400">You Won !</p>
            )}
            {result === RESULT_ENUM.OPPONENT_WINS && (
              <p className="mt-5 text-2xl text-red-400">You Lost.</p>
            )}
            <Button className="mt-3" onClick={() => onNextRound()}>
              Next Round
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RoundResult;
