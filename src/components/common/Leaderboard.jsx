import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useLeaderBoard from "@/app/hooks/useLeaderBoard";

const LeaderBoard = ({ openLeaderBoard, onOpenLeaderBoard }) => {
  const { leaderBoard, playerId } = useLeaderBoard();
  return (
    <Dialog
      open={openLeaderBoard}
      onOpenChange={() => {
        onOpenLeaderBoard();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <Card>
              <CardHeader>
                <CardTitle>LeaderBoard</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderBoard.map((player) => (
                      <TableRow key={player?.id}>
                        <TableCell className="font-medium">
                          {player.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {player.points || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderBoard;
