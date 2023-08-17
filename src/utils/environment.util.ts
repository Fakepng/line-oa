import { GptModel, gptModel } from "../types/gptModel";

function checkENV() {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const SECRET_TOKEN = process.env.SECRET_TOKEN;
  const GPT_TOKEN = process.env.GPT_TOKEN;
  const GPT_MODEL = process.env.GPT_MODEL;
  const REDIS_URL = process.env.REDIS_URL;

  let errors: string[] = [];

  if (ACCESS_TOKEN === undefined || ACCESS_TOKEN === "") {
    errors.push("ACCESS_TOKEN is not defined");
  }

  if (SECRET_TOKEN === undefined || SECRET_TOKEN === "") {
    errors.push("SECRET_TOKEN is not defined");
  }

  if (GPT_TOKEN === undefined || GPT_TOKEN === "") {
    errors.push("GPT_TOKEN is not defined");
  }

  if ([...gptModel].indexOf(GPT_MODEL as GptModel) === -1) {
    errors.push("GPT_MODEL is not defined or invalid");
  }

  if (REDIS_URL === undefined || REDIS_URL === "") {
    errors.push("REDIS_URL is not defined");
  }

  if (errors.length > 0) {
    console.error("Environment variables are not set ❌");
    throw new Error(errors.join("\n"));
  }

  console.log("Environment variables are all set ✅");
}

export { checkENV };
