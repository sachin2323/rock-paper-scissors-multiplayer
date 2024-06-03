"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
          <DialogTitle className="text-center">Result</DialogTitle>
          <DialogDescription>
            <div className="flex justify-between items-center mt-3">
              <MoveCard
                user={player}
                move={playerMove?.move}
                renderInsideModal
              />
              <MoveCard
                user={opponent}
                move={opponentMove?.move}
                renderInsideModal
              />
            </div>

            {result === RESULT_ENUM.DRAW && (
              <p className="mt-5 text-2xl text-center">Draw</p>
            )}
            {result === RESULT_ENUM.PLAYER_WINS && (
              <p className="mt-5 text-2xl text-green-400 text-center">
                You Won !
              </p>
            )}
            {result === RESULT_ENUM.OPPONENT_WINS && (
              <p className="mt-5 text-2xl text-red-400 text-center">
                You Lost.
              </p>
            )}

            <div className="flex justify-center items-center mt-3">
              <Button onClick={() => onNextRound()}>Next Round</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RoundResult;
