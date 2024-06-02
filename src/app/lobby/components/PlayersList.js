"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import PlayersToConnect from "./PlayersToConnect";

const PlayersList = ({ onGameConnect }) => {
  return (
    <Table>
      <TableCaption>active players in the lobby</TableCaption>
      <ScrollArea className="h-[300px] sm:h-[400px] rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Connect</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <PlayersToConnect onGameConnect={onGameConnect} />
        </TableBody>
      </ScrollArea>
    </Table>
  );
};

export default PlayersList;
