"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GAME_EXIT_ENUM } from "@/lib/constants";

const LostConnection = ({ onGameReset }) => {
  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">Connection Lost !</CardTitle>
          <CardDescription>Lost connection with opponent</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="mx-auto"
            src={"/rockPaperScissor.svg"}
            width="200"
            height="200"
            alt={"A Rock Paper Scissor Game Icon"}
          />
          <Button
            onClick={() =>
              onGameReset({ context: GAME_EXIT_ENUM.CONNECTION_LOST })
            }
          >
            Go to game lobby
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LostConnection;
