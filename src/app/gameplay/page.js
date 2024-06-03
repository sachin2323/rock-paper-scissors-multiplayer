"use client";

import React from "react";
import GameControls from "./components/GameControls";
import GameScreen from "./components/GameScreen";
import GameResult from "./components/GameResult";
import RoundResult from "./components/RoundResult";
import { useLogout } from "../hooks/useLogout";
import useGamePlay from "../hooks/useGamePlay";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import LostConnection from "./components/LostConnection";

const GamePlay = () => {
  const {
    playerId,
    playerName,
    player,
    opponent,
    playerMove,
    opponentMove,
    openResultModal,
    openGameResultModal,
    onMoveSelect,
    onClearAllPlayersMove,
    onPlayAgain,
    onGameReset,
  } = useGamePlay();

  const { onLogout } = useLogout();

  if (!opponent) {
    return <LostConnection onGameReset={onGameReset} />;
  }

  return (
    <div className="mx-auto w-full h-screen sm:w-2/4 p-3">
      <Header
        playerName={playerName}
        onGameReset={onGameReset}
        onLogout={onLogout}
      />

      <div className="my-2">
        <ScoreBoard opponent={opponent} player={player} />
      </div>

      <GameScreen
        player={player}
        playerMove={playerMove}
        opponentMove={opponentMove}
        opponent={opponent}
      />

      <div className="my-4">
        <GameControls
          disabled={!!playerMove?.move || !playerMove?.ready}
          onMoveSelect={onMoveSelect}
        />
      </div>

      {openResultModal && (
        <div className="w-full">
          <RoundResult
            result={openResultModal}
            onNextRound={onClearAllPlayersMove}
            playerMove={playerMove}
            opponentMove={opponentMove}
            opponent={opponent}
            player={player}
          />
        </div>
      )}

      {openGameResultModal?.won?.id === playerId ? (
        <GameResult
          variant="Won"
          result={openGameResultModal}
          onPlayAgain={onPlayAgain}
          onResetGame={onGameReset}
        />
      ) : (
        <GameResult
          variant="Lost"
          result={openGameResultModal}
          onPlayAgain={onPlayAgain}
          onResetGame={onGameReset}
        />
      )}
    </div>
  );
};

export default GamePlay;
