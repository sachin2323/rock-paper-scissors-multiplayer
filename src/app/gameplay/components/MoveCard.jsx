"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { MOVES_ENUM } from "@/lib/constants";

const MoveCard = ({ user, move, renderInsideModal }) => {
  if (!move) {
    return (
      <p className="text-base mb-3 px-2">Please select a move to play !</p>
    );
  }

  const selectedMove = MOVES_ENUM[move];

  return (
    <Card className={renderInsideModal && "w-[200px]"}>
      <CardHeader>
        <CardTitle className="capitalize text-left text-lg">
          {user?.name} has selected
        </CardTitle>
        <CardDescription className="capitalize text-left">
          {selectedMove?.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          className="mx-auto"
          src={selectedMove?.imgSrc}
          width="100"
          height="100"
          alt={selectedMove?.title}
        />
      </CardContent>
    </Card>
  );
};

export default MoveCard;
