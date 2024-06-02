"use client";

import LoginCard from "@/components/LoginCard";
import useAddPlayer from "./hooks/useAddPlayer";
import Header from "@/components/Header";

export default function Home() {
  const { playerName, error, onChangeName, onAddPlayer } = useAddPlayer();
  return (
    <main>
      <Header />
      <LoginCard
        playerName={playerName}
        error={error}
        onChangeName={onChangeName}
        onAddPlayer={onAddPlayer}
      />
    </main>
  );
}
