"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import LeaderBoard from "@/components/Leaderboard";
import { useState } from "react";
import Rules from "@/components/Rules";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [openRules, setOpenRules] = useState(false);

  const handleOpenLeaderBoard = (value) => {
    setOpenLeaderBoard(value);
  };

  const handleOpenRules = (value) => {
    setOpenRules(value);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="fixed bottom-3 right-3">
          <Button
            className="mr-4 bg-blue-900"
            onClick={() => {
              handleOpenRules(true);
            }}
          >
            Rules
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleOpenLeaderBoard(true);
            }}
          >
            Open LeaderBoard
          </Button>
        </div>
        {openLeaderBoard && (
          <LeaderBoard
            onOpenLeaderBoard={handleOpenLeaderBoard}
            openLeaderBoard={openLeaderBoard}
          />
        )}
        {openRules && (
          <Rules onOpenRules={handleOpenRules} openRules={openRules} />
        )}
      </body>
    </html>
  );
}
