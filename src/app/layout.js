"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import LeaderBoard from "@/components/common/Leaderboard";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);

  const handleOpenLeaderBoard = (value) => {
    setOpenLeaderBoard(value);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="z-10 fixed bottom-5 right-5">
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
      </body>
    </html>
  );
}
