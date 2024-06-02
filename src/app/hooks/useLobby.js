"use client";

import {
  ALL_PLAYERS,
  CONNECTION_ENUM,
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
  const [allPlayers, setAllPlayers] = useState({});
  //JSON.parse(localStorage.getItem(ALL_PLAYERS) || `{}`)
  const router = useRouter();

  useEffect(() => {
    channel.onmessage = (ev) => {
      switch (ev.data.state) {
        case CONNECTION_ENUM.REQUEST:
          if (ev.data.playerId === playerId) return;
          setRejectModal(null);
          setConnectModal(ev.data);
          break;
        case CONNECTION_ENUM.ACCEPT:
          if (ev.data.playerId === playerId) {
            allPlayers[playerId].game_state = GAME_STATE_ENUM.LIVE;
            allPlayers[playerId].opponentId = ev.data.opponentId;
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
      const { key, newValue } = e;
      if (key === ALL_PLAYERS) {
        setAllPlayers(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onPlayerAddition);
    return () => window.removeEventListener("storage", onPlayerAddition);
  });

  if (typeof window === "undefined") return {};

  const playerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const playerName = sessionStorage.getItem(PLAYER_NAME);

  if (!playerId) {
    router.push(Routes.HOME);
  }

  if (allPlayers[playerId]?.game_state === GAME_STATE_ENUM.LIVE) {
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
    channel.postMessage(connectionReq);
  };

  const handleAcceptFlow = ({ opponentId, opponentName }) => {
    channel.postMessage({
      playerName: playerName,
      playerId: playerId,
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
    setRejectModal(false);
  };

  const handleCloseRequestModal = () => {
    setRequestModal(false);
    setConnectModal(false);
  };

  const handleCloseConnectModal = () => {
    setConnectModal(false);
  };

  return {
    playerId,
    playerName,
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
