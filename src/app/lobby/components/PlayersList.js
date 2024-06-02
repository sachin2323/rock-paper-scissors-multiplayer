import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import PlayersToConnect from "./PlayersToConnect";

const PlayersList = ({ onGameConnect }) => {
  return (
    <Table>
      <TableCaption>active players in the lobby.</TableCaption>
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
    </Table>
  );
};

export default PlayersList;
