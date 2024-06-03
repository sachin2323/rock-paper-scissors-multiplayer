`use client`;
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const GameRequestModal = ({ requestModal, onCloseRequestModal }) => {
  return (
    <Dialog
      open={!!requestModal}
      onOpenChange={() => {
        onCloseRequestModal({
          opponentName: requestModal.opponentName,
          opponentId: requestModal.opponentId,
        });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Request Sent !</DialogTitle>
          <DialogDescription>
            <p className="text-lg py-2 mb-2 capitalize">
              Game request sent to {requestModal.opponentName}
            </p>

            <Button
              variant="destructive"
              onClick={() => {
                onCloseRequestModal({
                  opponentName: requestModal.opponentName,
                  opponentId: requestModal.opponentId,
                });
              }}
            >
              Cancel Request
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameRequestModal;
