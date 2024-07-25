/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BE_URL: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_RUN_MODE: string;
  readonly VITE_REVIEW_STUDIO_URL: string;
  readonly VITE_STRIPE_API: string;
  readonly VITE_ENCRYP_KEY: string;
  readonly VITE_FE_URL: string;
  readonly VITE_GA_TRACKING_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
