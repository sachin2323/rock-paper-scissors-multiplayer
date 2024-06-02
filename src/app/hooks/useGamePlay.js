"use client";
import React, { useState, useEffect } from "react";
import {
  ALL_PLAYERS,
  GAME_STATE_ENUM,
  LEADER_BOARD,
  PLAYER_ID_KEY,
  PLAYER_NAME,
  RESULT_ENUM,
  Routes,
} from "@/lib/constants";

import { useRouter } from "next/navigation";
import { gameEngine } from "../gameplay/lib/gameEngine";

const useGamePlay = () => {
  const [playerMove, setPlayerMove] = useState({});
  const [opponentMove, setOpponentMove] = useState({});
  const [openResultModal, setOpenResultModal] = useState(false);
  const [openGameResultModal, setOpenGameResultModal] = useState(false);
  const [allPlayers, setAllPlayers] = useState({});
  //JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`)
  const route = useRouter();

  useEffect(() => {
    channel.onmessage = (ev) => {
      if (ev.data?.opponentId === playerId) {
        setOpponentMove({ id: ev.data?.id, move: ev.data?.move });
      }
    };
  });

  useEffect(() => {
    const onPlayersUpdate = (e) => {
      const { key, newValue } = e;
      if (key === ALL_PLAYERS) {
        setAllPlayers(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onPlayersUpdate);
    return () => window.removeEventListener("storage", onPlayersUpdate);
  });

  if (typeof window === "undefined") return {};

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  const player = allPlayers[playerId];
  const opponent = allPlayers[player?.opponentId];

  const channel = new BroadcastChannel(`game_started`);

  const handleClearAllPlayersMove = () => {
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
    setPlayerMove((player) => ({ ...player, move: null }));
    setOpponentMove((opponent) => ({ ...opponent, move: null }));
    setOpenResultModal(null);
  };

  const handelMoveSelection = (selectedMove) => {
    setPlayerMove({
      id: playerId,
      move: selectedMove,
    });
    channel.postMessage({
      playerId: playerId,
      opponentId: opponent.id,
      move: selectedMove,
    });
  };

  const handlePlayAgain = () => {
    player.score = 0;
    opponent.score = 0;
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
    setPlayerMove((player) => ({ ...player, move: null }));
    setOpponentMove((opponent) => ({ ...opponent, move: null }));
    setOpenGameResultModal(null);
  };

  const handleGameReset = ({ context }) => {
    player.score = 0;
    player.opponentId = null;
    player.game_state = GAME_STATE_ENUM.NOT_STARTED;
    if (context !== "CONNECTION_LOST") {
      opponent.score = 0;
      opponent.opponentId = null;
      opponent.game_state = GAME_STATE_ENUM.NOT_STARTED;
    }
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
    route.push(Routes.LOBBY);
  };

  if (playerMove.move && opponentMove.move && !openResultModal) {
    const result = gameEngine(playerMove, opponentMove);
    if (result === RESULT_ENUM.PLAYER_WINS) {
      player.score = (player?.score || 0) + 1;
    }
    if (result === RESULT_ENUM.OPPONENT_WINS) {
      opponent.score = (opponent?.score || 0) + 1;
    }
    setOpenResultModal(result);
  }

  if (player?.score >= 5 && !openGameResultModal) {
    handleClearAllPlayersMove();
    player.points = (player?.points || 0) + 3;
    localStorage.setItem(LEADER_BOARD, JSON.stringify(allPlayers));
    setOpenGameResultModal({ won: player });
  }

  if (opponent?.score >= 5 && !openGameResultModal) {
    handleClearAllPlayersMove();
    opponent.points = (opponent?.points || 0) + 3;
    localStorage.setItem(LEADER_BOARD, JSON.stringify(allPlayers));
    setOpenGameResultModal({ won: opponent });
  }

  return {
    playerId,
    playerName,
    player,
    opponent,
    playerMove,
    opponentMove,
    openGameResultModal,
    openResultModal,
    onGameReset: handleGameReset,
    onMoveSelect: handelMoveSelection,
    onClearAllPlayersMove: handleClearAllPlayersMove,
    onPlayAgain: handlePlayAgain,
  };
};

export default useGamePlay;
