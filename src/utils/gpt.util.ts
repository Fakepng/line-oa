import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.GPT_TOKEN,
});

const GPTClient = new OpenAIApi(configuration);

async function generatePrompt(message: string, uid?: string) {
  console.log(`Generating prompt for "${message}"`);
  try {
    const chatCompletion = await GPTClient.createChatCompletion({
      model: process.env.GPT_MODEL || "",
      messages: [{ role: "user", content: `${message}` }],
      user: uid || "1",
    });

    return {
      response: chatCompletion.data.choices[0].message?.content,
      id: chatCompletion.data.id,
    };
  } catch (error) {
    console.error(error);
    return { response: "Error", id: "" };
  }
}

export { GPTClient, generatePrompt };
