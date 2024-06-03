"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import React from "react";
import Image from "next/image";

const GameResult = ({ variant, result, onResetGame, onPlayAgain }) => {
  return (
    <div>
      {result && (
        <Dialog open={!!result}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>You {variant} !!!</CardTitle>
                    <CardDescription>
                      {variant === "Won" ? "Party hard" : "Try Again"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Image
                      unoptimized
                      src={variant === "Won" ? "/victory.gif" : "/defeat.gif"}
                      width="200"
                      height="200"
                      alt={"test"}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button onClick={() => onPlayAgain()}>Play Again</Button>
                    <Button
                      variant="destructive"
                      onClick={() => onResetGame({ context: "EXIT_GAME" })}
                    >
                      Exit
                    </Button>
                  </CardFooter>
                </Card>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GameResult;
