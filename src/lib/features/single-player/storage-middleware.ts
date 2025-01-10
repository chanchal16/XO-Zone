import { Middleware } from "@reduxjs/toolkit";

const persistStateMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  // Specify the states to persist
  const stateToPersist = {
    playerSymbol: storeAPI.getState().singleMode.playerSymbol,
    aiSymbol: storeAPI.getState().singleMode.aiSymbol,
    score: storeAPI.getState().singleMode.score,
    playerAvatar: storeAPI.getState().singleMode.playerAvatar,
    botAvatar: storeAPI.getState().singleMode.botAvatar,
    difficulty: storeAPI.getState().singleMode.difficulty,
  };

  sessionStorage.setItem("singlePlayerState", JSON.stringify(stateToPersist));
  return result;
};

export default persistStateMiddleware;
