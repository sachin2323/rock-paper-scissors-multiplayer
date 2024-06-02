"use client";

import useLobby from "@/app/hooks/useLobby";
import NoActivePlayers from "./NoActivePlayers";
import GameRejectModal from "./GameRejectModal";
import PlayersList from "./PlayersList";
import GameRequestModal from "./GameRequestModal";
import GameConnectModal from "./GameConnectModal";

const Lobby = () => {
  const {
    playerId,
    allPlayers,
    connectModal,
    requestModal,
    rejectModal,
    onCloseRejectModal,
    onCloseRequestModal,
    onCloseConnectModal,
    onGameConnect,
  } = useLobby();

  if (Object.keys(allPlayers).length === 1) {
    return <NoActivePlayers />;
  }

  return (
    <div>
      <PlayersList onGameConnect={onGameConnect} />

      {requestModal && playerId === requestModal.playerId && (
        <GameRequestModal
          requestModal={requestModal}
          onCloseRequestModal={onCloseRequestModal}
        />
      )}

      {connectModal && playerId === connectModal.opponentId && (
        <GameConnectModal
          connectModal={connectModal}
          onCloseConnectModal={onCloseConnectModal}
        />
      )}

      {rejectModal && playerId === rejectModal.playerId && (
        <GameRejectModal
          rejectModal={rejectModal}
          onCloseRejectModal={onCloseRejectModal}
        />
      )}
    </div>
  );
};

export default Lobby;
