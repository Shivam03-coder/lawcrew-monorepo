import { config } from "dotenv";
config();

export const appEnvConfigs = {
  PORT: process.env.PORT,
  NEXT_APP_URI: process.env.NEXT_APP_URI,
  SESSION_TOKEN_KEY: process.env.SESSION_TOKEN_KEY,
};
