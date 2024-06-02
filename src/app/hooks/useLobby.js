"use client";

import {
  ALL_PLAYERS,
  CONNECTION_ENUM,
  GAME_STATE,
  GAME_STATE_ENUM,
  PLAYER_ID_KEY,
  PLAYER_NAME,
  Routes,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLobby = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [allPlayers, setAllPlayers] = useState(
    JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`)
  );
  const router = useRouter();

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  if (allPlayers[playerId].game_state === GAME_STATE_ENUM.LIVE) {
    router.push(Routes.GAME_PLAY);
  }

  const channel = new BroadcastChannel(`game_lobby`);

  const handleGameConnect = ({ opponentId, opponentName }) => {
    const connectionReq = {
      playerName: playerName,
      playerId: playerId,
      opponentId: opponentId,
      opponentName: opponentName,
      state: CONNECTION_ENUM.REQUEST,
    };
    setRequestModal(connectionReq);
    console.log("set request modal");
    channel.postMessage(connectionReq);
  };

  const handleAcceptFlow = ({ opponentId, opponentName }) => {
    channel.postMessage({
      opponentId: opponentId,
      opponentName: opponentName,
      state: CONNECTION_ENUM.ACCEPT,
    });
  };

  const handleRejectFlow = ({ playerId, opponentName }) => {
    channel.postMessage({
      playerId: playerId,
      opponentName: opponentName,
      state: CONNECTION_ENUM.REJECT,
    });
  };

  const handleCloseRejectModal = () => {
    console.log("clicked here");
    setRejectModal(false);
  };

  const handleCloseRequestModal = () => {
    console.log("clicked here");
    setRequestModal(false);
  };

  const handleCloseConnectModal = () => {
    console.log("clicked here");
    setConnectModal(false);
  };

  useEffect(() => {
    channel.onmessage = (ev) => {
      switch (ev.data.state) {
        case CONNECTION_ENUM.REQUEST:
          if (ev.data.playerId === playerId) return;
          setRejectModal(null);
          setConnectModal(ev.data);
          break;
        case CONNECTION_ENUM.ACCEPT:
          try {
            // console.log(
            //   "Players",
            //   allPlayers,
            //   ev.data.opponentId,
            //   allPlayers[ev.data.opponentId]
            // );

            allPlayers[playerId].game_state = GAME_STATE_ENUM.LIVE;
            allPlayers[playerId].opponentId = ev.data.opponentId;

            allPlayers[ev.data.opponentId].game_state = GAME_STATE_ENUM.LIVE;
            allPlayers[ev.data.opponentId].opponentId = playerId;

            localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
            router.push(Routes.GAME_PLAY);
          } catch (e) {
            console.error(e);
            allPlayers[ev.data.opponentId].game_state = GAME_STATE_ENUM.LIVE;
            allPlayers[ev.data.opponentId].opponentId = playerId;

            localStorage.setItem(ALL_PLAYERS, JSON.stringify(allPlayers));
            router.push(Routes.GAME_PLAY);
          }
          break;
        case CONNECTION_ENUM.REJECT:
          setConnectModal(null);
          setRequestModal(null);
          setRejectModal(ev.data);
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

  return {
    playerId,
    connectModal,
    requestModal,
    rejectModal,
    allPlayers,
    onGameConnect: handleGameConnect,
    onGameAccept: handleAcceptFlow,
    onGameReject: handleRejectFlow,
    onCloseRejectModal: handleCloseRejectModal,
    onCloseRequestModal: handleCloseRequestModal,
    onCloseConnectModal: handleCloseConnectModal,
  };
};

export default useLobby;
