"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  ALL_PLAYERS,
  GAME_STATE,
  GAME_STATE_ENUM,
  PLAYER_ID_KEY,
  PLAYER_NAME,
  Routes,
} from "./lib/constants";
//TODO - create and display leader board with tab sync using local state and local state sync
//TODO -
//TODO -
//TODO -
//TODO -
//TODO -

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const allPlayers = JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`);
  const gameState = sessionStorage.getItem(GAME_STATE);

  useEffect(() => {
    if (!playerId) {
      const id = `${Date.now()}${Math.random()}`; // generate unique UUID
      sessionStorage.setItem(PLAYER_ID_KEY, id);
      return;
    }

    const currentPlayer = allPlayers[playerId];
    if (!!currentPlayer && gameState !== GAME_STATE_ENUM.LIVE) {
      router.push(Routes.LOBBY);
    }
  }, []);

  const handleLobby = (e) => {
    sessionStorage.setItem(PLAYER_NAME, playerName);
    const players = {
      ...allPlayers,
      [playerId]: { name: playerName, id: playerId },
    };
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(players));
    router.push(Routes.LOBBY);
  };

  return (
    <main>
      <p className="mb-3 text-xl">Enter Your Name</p>
      <input
        type="text"
        className="text-black"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          handleLobby(e);
        }}
      >
        Let&apos;s get Started
      </button>
    </main>
  );
}
