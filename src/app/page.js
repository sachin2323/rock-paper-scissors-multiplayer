"use client";

import useAddPlayer from "./hooks/useAddPlayer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { playerName, onChangeName, onAddPlayer } = useAddPlayer();
  return (
    <main>
      <div className="flex justify-center items-center bg-[#26006E]">
        <Image
          src={"/rockPaperScissorMain.svg"}
          width="500"
          height="500"
          alt="Rock, Paper And Scissors"
        />
      </div>
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
                onChangeName(e.target.value);
              }}
            />
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
    </main>
  );
}
