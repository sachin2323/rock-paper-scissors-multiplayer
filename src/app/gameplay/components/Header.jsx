"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Header = ({ playerName, onGameReset, onLogout }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <h2 className="text-xl mb-2 font-semibold capitalize">
        Hello, {playerName}
      </h2>

      <div className="flex">
        <Button
          variant="secondary"
          className="mr-3"
          onClick={() => onGameReset({ context: "CONNECTION_LOST" })}
        >
          Exit Match
        </Button>

        <Button variant="destructive" onClick={() => onLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
