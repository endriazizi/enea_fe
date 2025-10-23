#!/usr/bin/env bash
set -euo pipefail

echo "🧾 DUMP MENÙ FE ▶️ $(pwd)"
echo "⏱  $(date)"
echo

# helper: stampa un file se esiste
dump() {
  local f="$1"
  if [ -f "$f" ]; then
    echo "────────────────────────────────────────────────────────"
    echo "📄 FILE: $f"
    echo "────────────────────────────────────────────────────────"
    cat "$f"
    echo
  else
    echo "⚠️  MISSING: $f"
    echo
  fi
}

# 0) Info ambiente veloce
echo "📦 package.json (deps rilevanti)"
jq '{dependencies, devDependencies}' package.json 2>/dev/null || cat package.json
echo

# 1) Config Angular/Ionic
dump angular.json
dump src/index.html
dump src/main.ts
dump src/styles.css
dump src/manifest.webmanifest  # se c'è

# 2) Env + tokens
dump src/app/environments/environment.ts
dump src/app/core/tokens.ts

# 3) Router + guard + interceptor + auth
dump src/app/app.config.ts
dump src/app/core/auth/auth.service.ts
dump src/app/core/auth/auth.guard.ts
dump src/app/core/auth/auth.interceptor.ts

# 4) Shell (menù)
dump src/app/shell/shell.page.ts
dump src/app/shell/shell.page.html
dump src/app/shell/shell.page.scss

# 5) Auth (login)
dump src/app/features/auth/login.page.ts
dump src/app/features/auth/login.page.html

# 6) Reservations (lista/nuova)
dump src/app/features/reservations/reservations-list.page.ts
dump src/app/features/reservations/reservations-list.page.html
dump src/app/features/reservations/new-reservation.page.ts
dump src/app/features/reservations/new-reservation.page.html

# 7) API FE (usate dal menù/pagine)
dump src/app/core/reservations/reservations.service.ts
dump src/app/core/reservations/reservations.service.ts

# 8) Piccola diagnostica “pattern” (cerco cose che spesso rompono il menù)
echo "🔍 CHECK rapidi (contentId, ion-menu, RouterLink, IonIcon registrati)"
echo "  - contentId in shell.page.html:"
grep -n "contentId" src/app/shell/shell.page.html || true
echo
echo "  - ion-menu in shell.page.html:"
grep -n "<ion-menu" src/app/shell/shell.page.html || true
echo
echo "  - routerLink in shell.page.html:"
grep -n "routerLink" src/app/shell/shell.page.html || true
echo
echo "  - IonIcon registrazioni (addIcons) in main.ts/shell.page.ts:"
grep -n "addIcons" -n src/main.ts src/app/shell/shell.page.ts 2>/dev/null || true
echo

echo "✅ FINE DUMP"
