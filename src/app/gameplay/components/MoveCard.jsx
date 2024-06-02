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

const MoveCard = ({ user, move }) => {
  if (!move) {
    return <p className="text-xl">Please select a move to play !</p>;
  }

  const selectedMove = MOVES_ENUM[move];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{user?.name} has selected</CardTitle>
        <CardDescription>{selectedMove?.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          className="mx-auto"
          src={selectedMove?.imgSrc}
          width="200"
          height="200"
          alt={selectedMove?.title}
        />
      </CardContent>
    </Card>
  );
};

export default MoveCard;
