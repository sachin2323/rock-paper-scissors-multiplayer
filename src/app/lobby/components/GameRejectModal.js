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
          <DialogTitle>Game Request Rejected !</DialogTitle>
          <DialogDescription>
            <p className="py-2 mb-2 text-lg capitalize">
              {rejectModal.opponentName} has rejected to play with you.
            </p>
            <Button
              variant="destructive"
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
