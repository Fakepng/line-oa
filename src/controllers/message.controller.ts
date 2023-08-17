import { lineClient } from "../utils/lineClient.util";

type textMessage = {
  text: string;
};

function sendText(replyToken: string, texts: textMessage[]) {
  const messages = texts.map((text) => {
    return {
      type: "text" as const,
      text: text.text,
    };
  });
  return lineClient.replyMessage(replyToken, messages);
}

type imageMessage = {
  original: string;
  preview?: string;
};

function sendImages(replyToken: string, images: imageMessage[]) {
  const messages = images.map((image) => {
    return {
      type: "image" as const,
      originalContentUrl: image.original,
      previewImageUrl: image.preview || image.original,
    };
  });
  return lineClient.replyMessage(replyToken, messages);
}

function sendFlex(replyToken: string, flex: any) {
  const messages = [
    {
      type: "flex" as const,
      altText: "Flex Message",
      contents: flex,
    },
  ];
  return lineClient.replyMessage(replyToken, messages);
}

export { sendText, sendImages, sendFlex };
