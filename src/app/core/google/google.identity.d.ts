// Tipi minimi per Google Identity Services (Code client). Evita conflitti TS2687.
export {};

declare global {
  interface Window { google?: any; }

  namespace google.accounts.oauth2 {
    interface CodeResponse { code: string; }
    interface CodeClientConfig {
      client_id: string;
      scope: string;
      ux_mode?: 'popup' | 'redirect';
      redirect_uri?: string;           // 'postmessage' per SPA
      prompt?: '' | 'consent' | 'select_account' | 'consent select_account';
      callback: (resp: CodeResponse) => void;
      error_callback?: (err: unknown) => void;
    }
    interface CodeClient { requestCode: () => void; }
    function initCodeClient(config: CodeClientConfig): CodeClient;
  }
}
