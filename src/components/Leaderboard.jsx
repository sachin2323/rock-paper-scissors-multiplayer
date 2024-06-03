"use client";
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
} from "@/components/ui/dialog";
import useLeaderBoard from "@/app/hooks/useLeaderBoard";
import { ScrollArea } from "./ui/scroll-area";

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
          <DialogDescription>
            <Card className="border-0">
              <CardHeader>
                <CardTitle>LeaderBoard</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <ScrollArea className="h-[300px] sm:h-[400px] rounded-md">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaderBoard.map((player) => (
                        <TableRow
                          key={player?.id}
                          className={
                            player.id === playerId &&
                            `bg-[#26006E] text-white hover:text-black`
                          }
                        >
                          <TableCell className="font-medium capitalize">
                            {player.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {player.points || 0}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ScrollArea>
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
