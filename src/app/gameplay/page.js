"use client";

import React from "react";
import GameControls from "./components/GameControls";
import GameScreen from "./components/GameScreen";
import GameResult from "./components/GameResult";
import RoundResult from "./components/RoundResult";
import { Button } from "@/components/ui/button";
import { useLogout } from "../hooks/useLogout";
import useGamePlay from "../hooks/useGamePlay";
import { PLAYER_NAME } from "@/lib/constants";

const GamePlay = () => {
  const playerName = sessionStorage.getItem(PLAYER_NAME);
  const {
    playerId,
    player,
    opponent,
    playerMove,
    opponentMove,
    openResultModal,
    openGameResultModal,
    onGameReset,
    onMoveSelect,
    onClearAllPlayersMove,
    onPlayAgain,
    onResetGame,
  } = useGamePlay();
  const { onLogout } = useLogout();
  if (!opponent) {
    return (
      <>
        <p>lost connection with opponent</p>
        <Button onClick={() => onGameReset({ context: "CONNECTION_LOST" })}>
          Go to game lobby
        </Button>
      </>
    );
  }

  return (
    <div>
      <p>
        Welcome to the challenge, {playerName}
        <Button onClick={() => onLogout()}>Logout</Button>
      </p>
      <GameScreen
        player={player}
        playerMove={playerMove}
        opponentMove={opponentMove}
        opponent={opponent}
      />
      <div className="mt-5">
        <GameControls
          disabled={!!playerMove?.move}
          onMoveSelect={onMoveSelect}
        />
      </div>

      {openResultModal && (
        <RoundResult
          result={openResultModal}
          onNextRound={onClearAllPlayersMove}
          playerMove={playerMove}
          opponentMove={opponentMove}
          opponent={opponent}
          player={player}
        />
      )}

      {openGameResultModal?.won?.id === playerId ? (
        <GameResult
          variant="Won"
          result={openGameResultModal}
          onPlayAgain={onPlayAgain}
          onResetGame={onResetGame}
        />
      ) : (
        <GameResult
          variant="Lost"
          result={openGameResultModal}
          onPlayAgain={onPlayAgain}
          onResetGame={onResetGame}
        />
      )}
    </div>
  );
};

export default GamePlay;
