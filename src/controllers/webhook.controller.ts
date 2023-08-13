import type { Request, Response } from "express";

import {
  Client as LineClient,
  ClientConfig as lineClientConfig,
  MessageEvent,
  Message,
} from "@line/bot-sdk";

const lineClientConfig: lineClientConfig = {
  channelAccessToken: process.env.ACCESS_TOKEN as string,
  channelSecret: process.env.SECRET_TOKEN as string,
};

const lineClient = new LineClient(lineClientConfig);

async function webhookController(req: Request, res: Response) {
  try {
    const events = req.body.events as MessageEvent[];
    console.log("events: ", events);
    return events.length > 0
      ? //@ts-ignore
        await events.map((item) => handleEvent(item))
      : res.status(200).send("OK");
  } catch (error) {
    console.error("/webhook error: ", error);
    return res.status(500).end();
  }
}

async function handleEvent(event: MessageEvent) {
  console.log("event: ", event);

  if (event.type !== "message" || event.message.type !== "text") {
    return lineClient.replyMessage(event.replyToken, {
      type: "text",
      text: "What did you say?",
    });
  }

  return lineClient.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
}

export { webhookController };
