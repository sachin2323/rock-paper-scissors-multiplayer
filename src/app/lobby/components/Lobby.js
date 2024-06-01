"use client";

import {
  ALL_PLAYERS,
  ENGAGED_PLAYERS,
  GAME_DATA,
  GAME_STATE,
  GAME_STATE_ENUM,
  PLAYER_ID_KEY,
  PLAYER_NAME,
} from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Lobby = () => {
  const [openReqModal, setOpenReqModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [allPlayers, setAllPlayers] = useState(
    JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`)
  );

  const router = useRouter();

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  const channel = new BroadcastChannel(`game_lobby`);

  const handleGameConnect = ({ opponentId, opponentName }) => {
    channel.postMessage({
      playerName: playerName,
      playerId: playerId,
      opponentId: opponentId,
      opponentName: opponentName,
      state: "request",
    });
  };

  const handleAcceptFlow = ({ opponentId, opponentName }) => {
    channel.postMessage({
      opponentId: opponentId,
      opponentName: opponentName,
      state: "accept",
    });
  };

  const handleRejectFlow = ({ playerId, opponentName }) => {
    channel.postMessage({
      playerId: playerId,
      opponentName: opponentName,
      state: "reject",
    });
  };

  useEffect(() => {
    channel.onmessage = (ev) => {
      switch (ev.data.state) {
        case "request":
          if (ev.data.playerId === playerId) return;
          setOpenRejectModal(null);
          setOpenReqModal(ev.data);
          break;
        case "accept":
          console.log(ev.data, playerId);
          allPlayers[playerId].game_state = GAME_STATE_ENUM.LIVE;
          allPlayers[playerId].opponentId = ev.data.opponentId;
          allPlayers[ev.data.opponentId].game_state = GAME_STATE_ENUM.LIVE;
          allPlayers[ev.data.opponentId].opponentId = playerId;
          localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
          sessionStorage.setItem(GAME_STATE, GAME_STATE_ENUM.LIVE);
          router.push("/gameplay");
          break;
        case "reject":
          setOpenReqModal(null);
          setOpenRejectModal(ev.data);
          break;
      }
    };
  });

  useEffect(() => {
    const onPlayerAddition = (e) => {
      console.log(e);
      const { key, newValue } = e;
      if (key === ALL_PLAYERS) {
        setAllPlayers(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onPlayerAddition);
    return () => window.removeEventListener("storage", onPlayerAddition);
  });

  return (
    <div className={`w-500px`}>
      <table bordered>
        <tr>Name</tr>
        <tr></tr>

        {Object.values(allPlayers || {})
          .filter((player) => player.id !== playerId)
          .map((opponent) => {
            return (
              <>
                <td>{opponent.name}</td>
                <td>
                  {opponent.game_state === GAME_STATE_ENUM.LIVE ? (
                    <p>currently in another match</p>
                  ) : (
                    <button
                      onClick={() => {
                        handleGameConnect({
                          opponentId: opponent.id,
                          opponentName: opponent.name,
                        });
                      }}
                    >
                      Connect
                    </button>
                  )}
                </td>
              </>
            );
          })}
      </table>
      {openReqModal && (
        <dialog open>
          <div>
            <p>{openReqModal.playerName} has requested to play with you.</p>
            <p>Please accept to start the game</p>
            <button
              onClick={() =>
                handleAcceptFlow({
                  opponentName: openReqModal.opponentName,
                  opponentId: openReqModal.opponentId,
                })
              }
            >
              Accept
            </button>
            <button
              onClick={() =>
                handleRejectFlow({
                  opponentName: openReqModal.opponentName,
                  playerId: openReqModal.playerId,
                })
              }
            >
              Reject
            </button>
          </div>
        </dialog>
      )}
      {openRejectModal && playerId === openRejectModal.playerId && (
        <dialog open>
          <div>
            <p>{openRejectModal.opponentName} has rejected to play with you.</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Lobby;
