"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "./ui/scroll-area";

const Rules = ({ openRules, onOpenRules }) => {
  return (
    <Dialog
      open={openRules}
      onOpenChange={() => {
        onOpenRules();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <ScrollArea className="h-[300px] sm:h-[400px] rounded-md">
              <div class="text-left p-2">
                <h1 class="text-xl font-bold mb-4">Game Rules and FAQ</h1>
                <section class="mb-1">
                  <h2 class="text-lg font-semibold mb-2">Objective</h2>
                  <p>The first player to reach 5 points wins the game.</p>
                </section>
                <section>
                  <Accordion type="multiple" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Rules</AccordionTrigger>
                      <AccordionContent>
                        <section class="text-left">
                          <h2 class="text-lg font-semibold mb-2">
                            How to Play
                          </h2>
                          <ol class="list-decimal list-inside">
                            <li class="mb-2">
                              <strong>Lobby:</strong>
                              <p>
                                Players can connect through a lobby. The lobby
                                displays the list of available players and their
                                status (Available or Playing).
                              </p>
                            </li>
                            <li class="mb-2">
                              <strong>Challenge:</strong>
                              <p>
                                Players can send a request to challenge another
                                player. The challenged player can accept or
                                reject the request.
                              </p>
                            </li>
                            <li class="mb-2">
                              <strong>Game Mechanics:</strong>
                              <ul class="list-disc list-inside">
                                <li>
                                  Each round, both players choose one of the
                                  following: Rock, Paper, Scissors.
                                </li>
                                <li>
                                  The winner of each round is determined by the
                                  following rules: Rock crushes Scissors,
                                  Scissors cuts Paper, Paper covers Rock.
                                </li>
                                <li>
                                  If both players choose the same item, the
                                  round is a draw and no points are awarded.
                                </li>
                              </ul>
                            </li>
                            <li class="mb-2">
                              <strong>Scoring:</strong>
                              <p>
                                Each win grants the player 1 point. The first
                                player to accumulate 5 points wins the game.
                              </p>
                            </li>
                            <li class="mb-2">
                              <strong>Leaderboard:</strong>
                              <p>
                                The leaderboard displays the points of all
                                players. Points are accumulated based on wins
                                from all games played.
                              </p>
                            </li>
                          </ol>
                        </section>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        How do I start a game?
                      </AccordionTrigger>
                      <AccordionContent>
                        Join the lobby and look for available players. Send a
                        request to challenge them. Once they accept, the game
                        begins.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How do I know if a player is available to play?
                      </AccordionTrigger>
                      <AccordionContent>
                        In the lobby, players who are available to play will be
                        marked as "Available". Players who are currently in a
                        game will be marked as "Playing".
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        What happens if my challenge request is rejected?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can send a challenge to another available player or
                        wait for someone to challenge you.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>
                        How are the points calculated?
                      </AccordionTrigger>
                      <AccordionContent>
                        Points are awarded based on wins. For each win 3 points
                        are awarded. Each game won increases your point total on
                        the leaderboard.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>
                        What happens if there is a draw in a round?
                      </AccordionTrigger>
                      <AccordionContent>
                        No points are awarded in the event of a draw. The game
                        continues until one player reaches 5 points.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                      <AccordionTrigger>
                        Can I view the leaderboard during a game?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes, you can view the leaderboard at any time to see the
                        rankings and points of all players.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                      <AccordionTrigger>
                        What if I disconnect during a game?
                      </AccordionTrigger>
                      <AccordionContent>
                        If you disconnect, the game will be paused. You can
                        reconnect to resume the game if connection is not lost,
                        or the other player may choose to end the game.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-9">
                      <AccordionTrigger>
                        Can I challenge the same player multiple times?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes, you can challenge any available player as many
                        times as you like.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-10">
                      <AccordionTrigger>
                        How do I update my status in the lobby?
                      </AccordionTrigger>
                      <AccordionContent>
                        Your status updates automatically based on your actions.
                        If you are not in a game, you will be marked as
                        "Available". If you are in a game, you will be marked as
                        "Playing".
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-11">
                      <AccordionTrigger>
                        How do I quit the game?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can quit the game at any time, but it will count as
                        a loss. If you need to quit, inform the other player and
                        exit the game.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </div>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Rules;
