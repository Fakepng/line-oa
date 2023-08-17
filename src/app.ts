import dotenv from "dotenv";
dotenv.config();

import { checkENV } from "./utils/environment.util";
checkENV();
import { testConnection } from "./database/redis.db";
(async () => await testConnection())();

import express from "express";
import { middleware as lineMiddleware } from "@line/bot-sdk";
import { webhookController } from "./controllers/webhook.controller";
import { lineMiddlewareConfig } from "./config/line.config";

import { baseController } from "./controllers/base.controller";

const app = express();

app.get("/", baseController);

app.post("/", lineMiddleware(lineMiddlewareConfig), webhookController);

app.listen(parseInt(process.env.PORT || "3000"), () => {
  console.log(`Server running at port ${process.env.PORT || "3000"} 🚀`);
});
