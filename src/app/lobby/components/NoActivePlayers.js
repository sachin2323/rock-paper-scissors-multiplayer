import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const NoActivePlayers = () => {
  return (
    <div className="grid place-items-center mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">No Active Player Found!</CardTitle>
          <CardDescription>
            Wait in the lobby or go have a sip of water
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="mx-auto"
            src={"/rockPaperScissor.svg"}
            width="500"
            height="500"
            alt={"A Rock Paper Scissor Game Icon"}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NoActivePlayers;
