"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginCard = ({ playerName, error, onAddPlayer, onChangeName }) => {
  return (
    <div className="max-w-md mx-auto p-4 mt-5 sm:mt-7 sm:p-0">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-5 mb-3 text-xl">Enter Your Name</p>
          <Input
            type="text"
            className="text-black mb-5"
            value={playerName}
            onChange={(e) => {
              onChangeName((e.target.value || "").trim());
            }}
          />
          {!!error && (
            <p className="text-red-400">
              This name is taken. Please try another
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={(e) => {
              onAddPlayer(e);
            }}
          >
            Let&apos;s get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCard;
