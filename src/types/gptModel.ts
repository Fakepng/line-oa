const gptModel4 = [
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-32k-0613",
  "gpt-4-0314",
  "gpt-4-32k-0314",
] as const;

const gptModel3_5 = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
] as const;

const gptModel3 = [] as const;

const gptModel = [...gptModel3, ...gptModel3_5, ...gptModel4];

type GptModel = (typeof gptModel)[number];

export { gptModel, gptModel3, gptModel3_5, gptModel4, GptModel };
