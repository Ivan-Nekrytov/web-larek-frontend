declare namespace NodeJS {
  interface ProcessEnv {
    API_ORIGIN: string;
    [key: string]: string | undefined;
  }
}