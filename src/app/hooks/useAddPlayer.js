`use client`;

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
import useLocalStorage from "./useLocalStorage";
import useSessionStorage from "./useSessionStorage";

const useAddPlayer = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [allPlayers, setAllPlayers] = useLocalStorage(ALL_PLAYERS, {});
  const [leaderBoard, setLeaderBoard] = useLocalStorage(LEADER_BOARD, {});
  const [playerId, setPlayerId] = useSessionStorage(PLAYER_ID_KEY, null);
  const [sessionPlayerName, setSessionPlayerName] = useSessionStorage(
    PLAYER_NAME,
    null
  );

  // if (typeof window === "undefined") return {};

  // const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  // const allPlayers = JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`);
  const allNames = Object.values(allPlayers || {}).map((player) =>
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
    if (!playerId) {
      console.log("herree");
      const id = `${Date.now()}${Math.random()}`; // generate unique UUID
      // sessionStorage.setItem(PLAYER_ID_KEY, playerId);
      // sessionStorage.setItem(PLAYER_NAME, playerName);
      const players = {
        ...allPlayers,
        [id]: { name: playerName, id: id },
      };
      setPlayerId(id);
      setSessionPlayerName(playerName);
      setAllPlayers(players);
      setLeaderBoard(players);
      // localStorage.setItem(ALL_PLAYERS, JSON.stringify(players));
      // localStorage.setItem(LEADER_BOARD, JSON.stringify(players));
    }
  };

  const handleNavToLobby = () => {
    createPlayer();
  };

  if (!!playerId) {
    console.log("this ran");
    router.push(Routes.LOBBY);
  }

  return {
    playerName,
    error,
    onChangeName: handlePlayerName,
    onAddPlayer: handleNavToLobby,
  };
};

export default useAddPlayer;
