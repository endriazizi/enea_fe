// src/app/core/auth/auth.guard.ts
// Protegge le rotte riservate. Se non autenticato → redirect a /login?redirect=<url>
// Mantiene la UX pulita: dopo il login si ritorna dove volevi andare.

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  const target = encodeURIComponent(location.pathname + location.search);
  return router.parseUrl(`/login?redirect=${target}`);
};
