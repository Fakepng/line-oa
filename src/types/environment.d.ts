declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_TOKEN: string;
      SECRET_TOKEN: string;
    }
  }
}

export {};
