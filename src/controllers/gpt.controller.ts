import { generatePrompt } from "../utils/gpt.util";
import { sendText } from "../controllers/message.controller";
import { MessageEvent } from "@line/bot-sdk";
import { redisClient } from "../database/redis.db";
import { getUsername } from "../utils/user.util";

async function chatGPT(event: MessageEvent) {
  if (event.message.type !== "text") {
    return;
  }

  const user = await saveUserId(event.source.userId as string);
  const uid = user ? user.id : "";
  const { response, id } = await generatePrompt(
    event.message.text,
    event.source.userId as string
  );
  await saveUserId(event.source.userId as string, id);
  sendText(event.replyToken, [{ text: response as string }]);
  return;
}

async function saveUserId(userId: string, id?: string) {
  await redisClient.connect();
  const uid = await redisClient.get(`${userId}:GPT`);

  if (!uid) {
    await redisClient.set(`${userId}:GPT`, "1");
  }

  if (id) {
    await redisClient.set(`${userId}:GPT`, id);
  }

  await redisClient.disconnect();

  return uid ? { userId, id: uid } : null;
}

export { chatGPT };
