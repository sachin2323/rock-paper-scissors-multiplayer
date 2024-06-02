"use client";

import { PLAYER_NAME } from "@/lib/constants";
import Lobby from "./components/Lobby";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";

export default function Page() {
  const { onLogout } = useLogout();
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  return (
    <main>
      <div className="flex flex-1 h-dvh">
        <div className="w-1/5 bg-[#26006E]">
          <Image
            src={"/rockPaperScissor.svg"}
            width="600"
            height="100"
            alt="Rock, Paper And Scissors"
          />
        </div>
        <div className="max-w-md mx-auto flex-1">
          <h1 className="mb-2">
            Hello, {playerName}
            <Button onClick={() => onLogout()}>Logout</Button>
          </h1>
          <Lobby />
        </div>
      </div>
    </main>
  );
}
