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
        onCloseRequestModal();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Sent !!!</DialogTitle>
          <DialogDescription>
            <p>Game request sent to {requestModal.opponentName}.</p>
            <Button
              onClick={() => {
                onCloseRequestModal();
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
