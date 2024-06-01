"use client";

import { ALL_PLAYERS, RESULT_ENUM } from "@/app/lib/constants";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GameScreen = ({
  player,
  opponent,
  result,
  onNextRound,
  playerMove,
  opponentMove,
}) => {
  console.log({ playerMove, opponentMove });

  return (
    <div>
      <p>You have selected {playerMove?.move}</p>
      <p>Their move is {opponentMove?.move}</p>
      {player?.name} Score - {player?.score}
      {opponent?.name} Score - {opponent?.score}
      {result && (
        <Dialog open={!!result}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Result</DialogTitle>
              <DialogDescription>
                {result === RESULT_ENUM.DRAW && <p>This round is draw</p>}
                {result === RESULT_ENUM.PLAYER_WINS && (
                  <p>{player?.name} won !!!</p>
                )}
                {result === RESULT_ENUM.OPPONENT_WINS && (
                  <p>{opponent?.name} won !!!</p>
                )}
                <Button onClick={() => onNextRound()}>Next Round</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GameScreen;
