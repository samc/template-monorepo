import { isNodeEnv } from "./_is-node-env";

export const isDevelopment = isNodeEnv("development");
