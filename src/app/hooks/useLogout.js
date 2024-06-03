"use client";

import { ALL_PLAYERS, PLAYER_ID_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import useSessionStorage from "./useSessionStorage";
import useLocalStorage from "./useLocalStorage";
// import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();
  const [playerId] = useSessionStorage(PLAYER_ID_KEY, null);
  const [allPlayers, setAllPlayers] = useLocalStorage(ALL_PLAYERS, {});

  // useEffect(() => {
  //   const logoutUser = (e) => {
  //     e.preventDefault();
  //     handleLogout();
  //   };
  //   window.addEventListener("beforeunload", logoutUser);
  //   () => window.removeEventListener("beforeunload", logoutUser);
  // });
  // if (typeof window === "undefined") return {};
  // const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const handleLogout = () => {
    const playerList = allPlayers;
    delete playerList[playerId];
    setAllPlayers(playerList);
    sessionStorage.clear();
    router.push("/");
  };

  return { onLogout: handleLogout };
};
