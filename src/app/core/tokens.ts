// src/app/core/tokens.ts
// ============================================================================
// InjectionToken centralizzato per la base URL delle API.
// Default: '/api' (dev con proxy). In prod puoi override in app.config.ts.
// ============================================================================

import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
