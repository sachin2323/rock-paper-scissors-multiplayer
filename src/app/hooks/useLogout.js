"use client";

import { ALL_PLAYERS, PLAYER_ID_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();
  useEffect(() => {
    const logoutUser = (e) => {
      e.preventDefault();
      handleLogout();
    };
    window.addEventListener("beforeunload", logoutUser);
    () => window.removeEventListener("beforeunload", logoutUser);
  });
  if (typeof window === "undefined") return {};
  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const handleLogout = () => {
    const playerList = JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`);
    delete playerList[playerId];
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(playerList));
    sessionStorage.clear();
    router.push("/");
  };

  return { onLogout: handleLogout };
};
