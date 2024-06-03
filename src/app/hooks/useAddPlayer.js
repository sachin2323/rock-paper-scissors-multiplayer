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
  const [error, setError] = useState(null);
  const [allPlayers, setAllPlayers] = useLocalStorage(ALL_PLAYERS, {});
  const [leaderBoard, setLeaderBoard] = useLocalStorage(LEADER_BOARD, {});
  const [playerId, setPlayerId] = useSessionStorage(PLAYER_ID_KEY, null);
  const [sessionPlayerName, setSessionPlayerName] = useSessionStorage(
    PLAYER_NAME,
    null
  );

  const allNames = Object.values(allPlayers || {}).map((player) =>
    player.name.toLowerCase()
  );

  const handlePlayerName = (value) => {
    setError(null);
    setPlayerName(value);
  };

  const createPlayer = () => {
    if (allNames.includes(playerName.toLowerCase())) {
      setError(ERRORS_ENUM.NAME_ERR);
      return;
    }
    if (!playerId) {
      const id = `${Date.now()}${Math.random()}`; // generate unique UUID
      const players = {
        ...allPlayers,
        [id]: { name: playerName, id: id },
      };
      setPlayerId(id);
      setSessionPlayerName(playerName);
      setAllPlayers(players);
      setLeaderBoard(players);
    }
  };

  const handleNavToLobby = () => {
    createPlayer();
  };

  if (!!playerId) {
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
