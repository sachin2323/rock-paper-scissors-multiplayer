import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { MOVES_ENUM } from "@/lib/constants";

const MoveCard = ({ user, move }) => {
  if (!move) {
    return <p>Please select a move to play</p>;
  }

  const selectedMove = MOVES_ENUM[move];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.name} have Selected</CardTitle>
        <CardDescription>{selectedMove?.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={selectedMove?.imgSrc}
          width="200"
          height="200"
          alt={selectedMove?.title}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default MoveCard;
