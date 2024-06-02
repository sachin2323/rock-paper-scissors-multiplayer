import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const GameRejectModal = ({ rejectModal, onCloseRejectModal }) => {
  return (
    <Dialog
      open={!!rejectModal}
      onOpenChange={() => {
        onCloseRejectModal();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rejected !!!</DialogTitle>
          <DialogDescription>
            <p>{rejectModal.opponentName} has rejected to play with you.</p>
            <Button
              onClick={() => {
                onCloseRejectModal();
              }}
            >
              Close
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameRejectModal;
