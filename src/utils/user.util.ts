import { lineClient } from "./lineClient.util";

async function getUsername(userId: string) {
  const user = await lineClient.getProfile(userId);
  return user.displayName;
}

export { getUsername };
