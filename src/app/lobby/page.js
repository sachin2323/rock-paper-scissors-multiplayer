"use client";

import { Button } from "@/components/ui/button";
import { ALL_PLAYERS, PLAYER_ID_KEY, PLAYER_NAME } from "../lib/constants";
import Lobby from "./components/Lobby";
import { useRouter } from "next/navigation";

export default function Page() {
  const playerName = sessionStorage.getItem(PLAYER_NAME);
  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const router = useRouter();
  const handleLogout = () => {
    const playerList = JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`);
    delete playerList[playerId];
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(playerList));
    sessionStorage.clear();
    localStorage.removeItem(GAME_DATA);
    router.push("/");
  };

  return (
    <main>
      <h1 className="mb-2">Hello, {playerName}</h1>
      <Lobby />
    </main>
  );
}
