import {
  ClientConfig as lineClientConfig,
  MiddlewareConfig as lineMiddlewareConfig,
} from "@line/bot-sdk";

const lineClientConfig: lineClientConfig = {
  channelAccessToken: process.env.ACCESS_TOKEN as string,
  channelSecret: process.env.SECRET_TOKEN as string,
};

const lineMiddlewareConfig: lineMiddlewareConfig = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_TOKEN as string,
};

export { lineClientConfig, lineMiddlewareConfig };
