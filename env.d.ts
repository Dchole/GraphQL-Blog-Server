declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB: string;
    JWT_SECRET: string;
  }
}
