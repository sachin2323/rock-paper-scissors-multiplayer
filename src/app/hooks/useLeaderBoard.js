"use client";

import { LEADER_BOARD, PLAYER_ID_KEY } from "@/lib/constants";

import useLocalStorage from "./useLocalStorage";
import useSessionStorage from "./useSessionStorage";

const useLeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useLocalStorage(LEADER_BOARD, {});
  const [playerId] = useSessionStorage(PLAYER_ID_KEY, null);

  // const playerId = sessionStorage.getItem(PLAYER_ID_KEY);

  const modifiedLeaderBoard = Object.values(leaderBoard || {}).sort(
    (a, b) => (b?.points || 0) - (a?.points || 0)
  );

  return { leaderBoard: modifiedLeaderBoard, playerId };
};

export default useLeaderBoard;
