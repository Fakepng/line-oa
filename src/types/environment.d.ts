import { GptModel } from "./gptModel";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_TOKEN: string;
      SECRET_TOKEN: string;
      GPT_TOKEN: string;
      GPT_MODEL: GptModel;
      REDIS_URL: string;
    }
  }
}

export {};
