"use client";

import { PLAYER_NAME, THEME_BG_COLOR } from "@/lib/constants";
import Lobby from "./components/Lobby";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";

export default function Page() {
  const { onLogout } = useLogout();
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  return (
    <main>
      <div className="flex flex-col ">
        <div className={`bg-[${THEME_BG_COLOR}]`}>
          <Image
            src={"/rockPaperScissorMain.svg"}
            width="300"
            height="200"
            alt="Rock, Paper And Scissors"
          />
        </div>
        <div className="mx-auto w-full sm:w-2/4 p-1">
          <div className="flex justify-between items-center p-2">
            <h2 className="text-xl mb-2 font-semibold capitalize">
              Hello, {playerName}
            </h2>
            <Button variant="destructive" onClick={() => onLogout()}>
              Logout
            </Button>
          </div>
          <Lobby />
        </div>
      </div>
    </main>
  );
}
