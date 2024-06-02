"use client";

import { LEADER_BOARD, PLAYER_ID_KEY } from "@/lib/constants";

import { useEffect, useState } from "react";

const useLeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState(
    JSON.parse(localStorage.getItem(LEADER_BOARD) || `{}`)
  );

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);

  useEffect(() => {
    const onPlayerAddition = (e) => {
      const { key, newValue } = e;
      if (key === LEADER_BOARD) {
        setLeaderBoard(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onPlayerAddition);
    return () => window.removeEventListener("storage", onPlayerAddition);
  });

  const modifiedLeaderBoard = Object.values(leaderBoard).sort(
    (a, b) => (b?.points || 0) - (a?.points || 0)
  );

  console.log(modifiedLeaderBoard);

  return { leaderBoard: modifiedLeaderBoard, playerId };
};

export default useLeaderBoard;
