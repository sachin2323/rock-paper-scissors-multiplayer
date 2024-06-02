"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ALL_PLAYERS,
  ERRORS_ENUM,
  LEADER_BOARD,
  PLAYER_ID_KEY,
  PLAYER_NAME,
  Routes,
} from "@/lib/constants";

const useAddPlayer = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const allPlayers = JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`);
  const allNames = Object.values(allPlayers).map((player) =>
    player.name.toLowerCase()
  );

  const handlePlayerName = (value) => {
    setPlayerName(value);
  };

  const createPlayer = () => {
    if (allNames.includes(playerName.toLowerCase())) {
      setError(ERRORS_ENUM.NAME_ERR);
      return;
    }
    let playerId = sessionStorage.getItem(PLAYER_ID_KEY);
    if (!playerId) {
      playerId = `${Date.now()}${Math.random()}`; // generate unique UUID
      sessionStorage.setItem(PLAYER_ID_KEY, playerId);
      sessionStorage.setItem(PLAYER_NAME, playerName);
      const players = {
        ...allPlayers,
        [playerId]: { name: playerName, id: playerId },
      };
      localStorage.setItem(ALL_PLAYERS, JSON.stringify(players));
      localStorage.setItem(LEADER_BOARD, JSON.stringify(players));
    }
    return playerId;
  };

  const handleNavToLobby = () => {
    const playerId = createPlayer();
    if (!!playerId) {
      router.push(Routes.LOBBY);
    }
  };

  if (!!playerId) {
    handleNavToLobby();
  }

  return {
    playerName,
    error,
    onChangeName: handlePlayerName,
    onAddPlayer: handleNavToLobby,
  };
};

export default useAddPlayer;
