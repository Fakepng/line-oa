import type { Request, Response } from "express";
import { MessageEvent } from "@line/bot-sdk";

import { sendText, sendImages, sendFlex } from "./message.controller";
import { chatGPT } from "./gpt.controller";
import { redisClient } from "../database/redis.db";

async function webhookController(req: Request, res: Response) {
  try {
    const events = req.body.events as MessageEvent[];
    console.log("events: ", events);
    return events.length > 0
      ? await events.map((event) => handleEvent(event))
      : res.status(200).send("OK");
  } catch (error) {
    console.error("/webhook error: ", error);
    return res.status(500).end();
  }
}

async function handleEvent(event: MessageEvent) {
  console.log("event: ", event);

  if (event.type !== "message") {
    return;
  }

  // if (event.source.type !== "user") {
  //   return sendText(event.replyToken, [{ text: "I don't talk to groups" }]);
  // }

  await saveEvent(event);

  switch (event.message.type) {
    case "text":
      handleText(event);
      break;

    default:
      sendText(event.replyToken, [{ text: "I only talk in text" }]);
  }

  return;
}

async function handleText(event: MessageEvent) {
  if (event.message.type !== "text") {
    console.error("handleText error: ", event.message.type);
    return;
  }
  if (!(event.source.type === "user" || event.source.type === "group")) {
    console.error("handleText error: ", event.source.type);
    return;
  }

  switch (event.message.text) {
    case "image":
      sendImages(event.replyToken, [
        {
          original: "https://placehold.co/1024",
          preview: "https://placehold.co/240",
        },
      ]);
      break;

    case "images":
      sendImages(event.replyToken, [
        {
          original: "https://placehold.co/1024",
          preview: "https://placehold.co/240",
        },
        {
          original: "https://placehold.co/1024",
          preview: "https://placehold.co/240",
        },
        {
          original: "https://placehold.co/1024",
          preview: "https://placehold.co/240",
        },
        {
          original: "https://placehold.co/1024",
          preview: "https://placehold.co/240",
        },
      ]);
      break;

    case "hi gpt":
      chatGPT(event);
      break;

    case "flex":
      sendFlex(event.replyToken, {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_3_movie.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "http://linecorp.com/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          spacing: "md",
          contents: [
            {
              type: "text",
              text: "BROWN'S ADVENTURE\nIN MOVIE",
              wrap: true,
              weight: "bold",
              gravity: "center",
              size: "xl",
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                {
                  type: "icon",
                  size: "sm",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                },
                {
                  type: "text",
                  text: "4.0",
                  size: "sm",
                  color: "#999999",
                  margin: "md",
                  flex: 0,
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Date",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: "Monday 25, 9:00PM",
                      wrap: true,
                      size: "sm",
                      color: "#666666",
                      flex: 4,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Place",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: "7 Floor, No.3",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 4,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Seats",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: "C Row, 18 Seat",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 4,
                    },
                  ],
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              margin: "xxl",
              contents: [
                {
                  type: "image",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                  aspectMode: "cover",
                  size: "xl",
                  margin: "md",
                },
                {
                  type: "text",
                  text: "You can enter the theater by using this code instead of a ticket",
                  color: "#aaaaaa",
                  wrap: true,
                  margin: "xxl",
                  size: "xs",
                },
              ],
            },
          ],
        },
      });
      break;

    default:
      chatGPT(event);
  }

  return;
}

async function saveEvent(event: MessageEvent) {
  await redisClient.connect();

  const date = new Date().toISOString();
  await redisClient.set(`EVENT:${date}`, JSON.stringify(event));
  const EXPIRE_SECONDS = 24 * 60 * 60;
  await redisClient.expire(`EVENT:${date}`, EXPIRE_SECONDS);

  await redisClient.disconnect();

  return;
}

export { webhookController };
