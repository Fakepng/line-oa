import { Client as LineClient } from "@line/bot-sdk";

import { lineClientConfig } from "../config/line.config";

const lineClient = new LineClient(lineClientConfig);

export { lineClient };
