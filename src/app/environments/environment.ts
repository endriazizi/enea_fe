export const environment = {
  production: false,
  apiUrl: '/api',
  devLogin: {
    enabled: true,
    email: 'admin@demo.it',
    password: 'Admin!2025'
  },
  // googleClientId: 'PASTE_CLIENT_ID.apps.googleusercontent.com',
    googleClientId: '512175551489-082s3f7pri0rl9uv0ujkiko31dnoo8o7.apps.googleusercontent.com',
  googleApiKey:   '', // opzionale (non serve per People, ma lo lasciamo per future api)

    // ✅ SCOPES usati dalla People API per leggere i contatti
  // Puoi aggiungere anche: 'https://www.googleapis.com/auth/contacts.other.readonly'
  googleScopes: 'https://www.googleapis.com/auth/contacts.readonly',
};