import { insertCoin } from "playroomkit";

export async function initPlayroom(roomCode) {
  await insertCoin({
    skipLobby: true,
    roomCode, // undefined = auto create
  });
}