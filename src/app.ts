import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import {
  MiddlewareConfig as lineMiddlewareConfig,
  middleware as lineMiddleware,
} from "@line/bot-sdk";

import { webhookController } from "./controllers/webhook.controller";

const app = express();

const lineMiddlewareConfig: lineMiddlewareConfig = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_TOKEN as string,
};

app.post("/", lineMiddleware(lineMiddlewareConfig), webhookController);

app.listen(parseInt(process.env.PORT || "3000"), () => {
  console.log(`Server running at port ${process.env.PORT || "3000"}`);
});
