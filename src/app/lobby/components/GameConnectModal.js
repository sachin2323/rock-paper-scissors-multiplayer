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
          <DialogTitle>New Game Request</DialogTitle>
          <DialogDescription>
            <p>{connectModal.playerName} has requested to play with you.</p>
            <p>Please accept to start the game</p>
            <Button
              onClick={() =>
                onGameAccept({
                  opponentName: connectModal.opponentName,
                  opponentId: connectModal.opponentId,
                })
              }
            >
              Accept
            </Button>
            <Button
              onClick={() =>
                onGameReject({
                  opponentName: connectModal.opponentName,
                  playerId: connectModal.playerId,
                })
              }
            >
              Reject
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameConnectModal;
