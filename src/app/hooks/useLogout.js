"use client";

import { ALL_PLAYERS, PLAYER_ID_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import useSessionStorage from "./useSessionStorage";
import useLocalStorage from "./useLocalStorage";

export const useLogout = () => {
  const router = useRouter();
  const [playerId] = useSessionStorage(PLAYER_ID_KEY, null);
  const [allPlayers, setAllPlayers] = useLocalStorage(ALL_PLAYERS, {});

  const handleLogout = () => {
    const playerList = allPlayers;
    delete playerList[playerId];
    setAllPlayers(playerList);
    sessionStorage.clear();
    router.push("/");
  };

  return { onLogout: handleLogout };
};
