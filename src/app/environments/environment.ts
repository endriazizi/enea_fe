export const environment = {
  production: false,
  apiBaseUrl: '/api',
  devLogin: {
    enabled: true,
    email: 'admin@demo.it',
    password: 'admin',
  },
  googleClientId: '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com',
  googleApiKey: '', // opzionale (non serve per People, ma lo lasciamo per future api)

  // ✅ SCOPES usati dalla People API per leggere i contatti
  googleScopes: 'https://www.googleapis.com/auth/contacts.readonly',
};
