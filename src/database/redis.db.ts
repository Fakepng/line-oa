import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error(error);
  throw new Error("Redis Client Error ❌");
});

async function testConnection() {
  await redisClient.connect();
  const pong = await redisClient.ping();
  if (pong !== "PONG") {
    throw new Error("Redis connection failed ❌");
  } else {
    console.log("Redis connection success ✅");
  }
  await redisClient.disconnect();
}

export { redisClient, testConnection };
