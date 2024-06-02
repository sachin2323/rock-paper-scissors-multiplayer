import React from "react";
import useLobby from "@/app/hooks/useLobby";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GAME_STATE_ENUM } from "@/lib/constants";

const PlayersToConnect = ({ onGameConnect }) => {
  const { allPlayers, playerId } = useLobby();
  return (
    <>
      {Object.values(allPlayers || {})
        .filter((player) => player.id !== playerId)
        .map((opponent) => {
          return (
            <>
              <TableRow>
                <TableCell className="font-medium">{opponent.name}</TableCell>
                <TableCell>
                  {opponent.game_state === GAME_STATE_ENUM.LIVE
                    ? "PLAYING"
                    : "AVAILABLE"}
                </TableCell>
                <TableCell className="text-right">
                  {opponent.game_state === GAME_STATE_ENUM.LIVE ? (
                    <p>In another match</p>
                  ) : (
                    <Button
                      onClick={() => {
                        onGameConnect({
                          opponentId: opponent.id,
                          opponentName: opponent.name,
                        });
                      }}
                    >
                      Connect
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </>
          );
        })}
    </>
  );
};

export default PlayersToConnect;
