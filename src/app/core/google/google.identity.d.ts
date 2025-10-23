// src/app/core/google/google.identity.d.ts
// Tipi minimi per Google Identity Services (evita any). Non serve installare @types.

export {};

declare global {
  interface Window {
    google?: typeof google;
  }

  namespace google.accounts.oauth2 {
    interface TokenResponse {
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
    }
    interface TokenClientConfig {
      client_id: string;
      scope: string;
      prompt?: '' | 'consent';
      callback: (resp: TokenResponse) => void;
      error_callback?: (err: unknown) => void;
    }
    interface OverridableTokenClientConfig {
      prompt?: '' | 'consent';
      hint?: string;
    }
    interface TokenClient {
      requestAccessToken: (overrideConfig?: OverridableTokenClientConfig) => void;
    }
    function initTokenClient(config: TokenClientConfig): TokenClient;
    function revoke(accessToken: string, done: () => void): void;
  }
}
