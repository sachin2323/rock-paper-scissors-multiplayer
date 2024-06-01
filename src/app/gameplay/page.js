"use client";

import React, { useEffect, useState } from "react";
import GameControls from "./components/GameControls";
import GameScreen from "./components/GameScreen";
import {
  ALL_PLAYERS,
  GAME_STATE_ENUM,
  PLAYER_ID_KEY,
  PLAYER_NAME,
  RESULT_ENUM,
  Routes,
} from "../lib/constants";
import { gameEngine } from "./lib/gameEngine";
import GameResult from "./components/GameResult";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GamePlay = () => {
  const [playerMove, setPlayerMove] = useState({});
  const [opponentMove, setOpponentMove] = useState({});
  const [openResultModal, setOpenResultModal] = useState(false);
  const [openGameResultModal, setOpenGameResultModal] = useState(false);
  const [allPlayers, setAllPlayers] = useState(
    JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`)
  );

  const route = useRouter();

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  const player = allPlayers[playerId];
  const opponent = allPlayers[player?.opponentId];

  console.log({ opponent });

  const channel = new BroadcastChannel(`game_started`);

  useEffect(() => {
    channel.onmessage = (ev) => {
      if (ev.data?.id === playerId || opponentMove.id) return;
      setOpponentMove({ id: ev.data?.id, move: ev.data?.move });
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

  const handleNextRound = () => {
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
    channel.postMessage({ id: playerId, move: selectedMove });
  };

  const handlePlayAgain = () => {
    player.score = 0;
    opponent.score = 0;
    localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
    setPlayerMove((player) => ({ ...player, move: null }));
    setOpponentMove((opponent) => ({ ...opponent, move: null }));
    setOpenGameResultModal(null);
  };

  const handleGameReset = () => {
    player.score = 0;
    player.opponentId = null;
    player.game_state = GAME_STATE_ENUM.NOT_STARTED;
    if (opponent) {
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
    handleNextRound();
    setOpenGameResultModal(player);
  }

  if (opponent?.score >= 5 && !openGameResultModal) {
    handleNextRound();
    setOpenGameResultModal(opponent);
  }

  if (!opponent) {
    return (
      <>
        <p>lost connection with opponent</p>
        <Button onClick={handleGameReset}>Go to game lobby</Button>
      </>
    );
  }

  return (
    <div>
      <p>Welcome to the challenge, {playerName}</p>
      <GameScreen
        player={player}
        playerMove={playerMove}
        opponentMove={opponentMove}
        opponent={opponent}
        result={openResultModal}
        onNextRound={handleNextRound}
      />
      <GameControls
        disabled={!!player?.move}
        onMoveSelect={handelMoveSelection}
      />
      <GameResult
        result={openGameResultModal}
        onPlayAgain={handlePlayAgain}
        onResetGame={handleGameReset}
      />
    </div>
  );
};

export default GamePlay;
