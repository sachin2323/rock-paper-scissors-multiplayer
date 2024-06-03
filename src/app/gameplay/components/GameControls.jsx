"use client";

import { MOVES_ENUM } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const moveCodeList = Object.values(MOVES_ENUM).map((move) => move.code);

const GameControls = ({ disabled, onMoveSelect }) => {
  return (
    <div>
      <div className="flex justify-around">
        {Object.values(MOVES_ENUM).map((move) => {
          return (
            <div
              key={move.code}
              className="flex flex-col items-center justify-center"
            >
              <Button
                disabled={disabled}
                variant="ghost"
                id={move.code}
                size="icon"
                onClick={() => onMoveSelect(move.code)}
              >
                <Image
                  src={move.imgSrc}
                  width="50"
                  height="50"
                  alt={move.title}
                />
              </Button>
              <Label className="mt-1" htmlFor={move.code}>
                {move.title}
              </Label>
            </div>
          );
        })}

        <div className="flex flex-col items-center justify-center">
          <Button
            disabled={disabled}
            variant="secondary"
            id={"random"}
            onClick={() => {
              const move = moveCodeList[Math.floor(Math.random() * 3)];
              onMoveSelect(move);
            }}
          >
            Random
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
