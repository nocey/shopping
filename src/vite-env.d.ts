/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare module "helper";

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
