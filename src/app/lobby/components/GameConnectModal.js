"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useLobby from "@/app/hooks/useLobby";

const GameConnectModal = ({ connectModal, onCloseConnectModal }) => {
  const { onGameAccept, onGameReject } = useLobby();

  return (
    <Dialog open={!!connectModal} onOpenChange={() => onCloseConnectModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Request Received !</DialogTitle>
          <DialogDescription>
            <div className="py-2 my-2">
              <p className="text-base text-left capitalize">
                {connectModal.playerName} has requested to play with you. Please
                accept to start the game.
              </p>
            </div>
            <div className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() =>
                  onGameReject({
                    opponentName: connectModal.opponentName,
                    playerId: connectModal.playerId,
                  })
                }
              >
                Reject
              </Button>

              <Button
                onClick={() =>
                  onGameAccept({
                    opponentName: connectModal.playerName,
                    opponentId: connectModal.playerId,
                  })
                }
              >
                Accept
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameConnectModal;
