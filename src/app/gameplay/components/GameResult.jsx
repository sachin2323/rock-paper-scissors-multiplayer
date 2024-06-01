"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import React from "react";

const GameResult = ({ result, onResetGame, onPlayAgain }) => {
  return (
    <div>
      {result && (
        <Dialog open={!!result}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Result</DialogTitle>
              <DialogDescription>
                <p>{result?.name} Won!!!!!</p>
                <Button onClick={() => onPlayAgain()}>Play Again</Button>
                <Button onClick={() => onResetGame()}>Exit</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GameResult;
