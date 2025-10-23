#!/usr/bin/env bash
set -euo pipefail
# -e: esci al primo errore
# -u: errore se usi variabili non definite
# -o pipefail: se un comando in pipe fallisce, fallisce la pipe

# ===================== CONFIG =====================
ROOT="${ROOT:-.}"                          # cartella radice da esportare (usa ROOT=src per solo src/)
OUT="${OUT:-PROJECT_SNAPSHOT.md}"          # file markdown di output
INCLUDE_BIN="${INCLUDE_BIN:-0}"            # 0 = esclude asset/binari (consigliato per ChatGPT)
NORMALIZE_CRLF="${NORMALIZE_CRLF:-1}"      # 1 = rimuove \r (CRLF→LF)
MAX_BYTES_PER_FILE="${MAX_BYTES_PER_FILE:-120000}"  # 120 KB per file (0 = nessun limite)
MAX_FILES="${MAX_FILES:-0}"                # 0 = nessun limite sul numero di file
# Directory da escludere ovunque (tree + find)
EXCLUDE_DIRS=( "node_modules" ".git" )
# Pattern binari (saltati se INCLUDE_BIN=0)
BIN_GLOBS=( "*.png" "*.jpg" "*.jpeg" "*.gif" "*.webp" "*.ico" "*.svg" "*.svgz"
            "*.pdf" "*.zip" "*.gz" "*.rar" "*.7z"
            "*.mp3" "*.wav" "*.mp4" "*.webm" "*.mov"
            "*.woff" "*.woff2" "*.ttf" "*.otf" "*.eot"
            "*.exe" "*.dll" "*.so" "*.dylib" "*.a" "*.jar" "*.psd" "*.ai" )
# ==================================================

# ===================== 1) TREE =====================
TREE_FILE="$(mktemp)"

# Prova prima il tree NPM (tipicamente "tree-cli"): -l (elle) = profondità, -I con virgole
EXCL_COMMA="$(IFS=, ; echo "${EXCLUDE_DIRS[*]}")"  # es. "node_modules,.git"
if [ -x "./node_modules/.bin/tree" ]; then
  ./node_modules/.bin/tree "$ROOT" -a -l 100 --dirs-first -I "$EXCL_COMMA" > "$TREE_FILE" || true
else
  # Fallback Windows: tree nativo (entra in ROOT) stampa file (/F) in ASCII (/A)
  if command -v cmd >/dev/null 2>&1; then
    ( cd "$ROOT" && cmd //c "tree /F /A" ) | sed 's/\r$//' > "$TREE_FILE" || true
  else
    # Ultimo fallback: elenco ricorsivo “piatto” (non grafico)
    find "$ROOT" -print | sed 's|^\./||' > "$TREE_FILE"
  fi
fi

# Post-filtro robusto: rimuovi QUALSIASI riga del tree che contenga dir escluse
# Usa solo grep -E (niente sed con {}) per compatibilità MinGW
EXCL_ALT="$(printf '%s' "${EXCLUDE_DIRS[*]}" | sed 's/ /|/g; s/\./\\./g')"   # "node_modules|\.git"
grep -viE "([\\/]|^)(${EXCL_ALT})([\\/]|$)" "$TREE_FILE" > "${TREE_FILE}.f" || true
mv "${TREE_FILE}.f" "$TREE_FILE"

# ===================== 2) LISTA FILE =====================
# Costruisci l'espressione -prune per find: salta ROOT/<dir_escluse>
PRUNE_EXPR=()
for d in "${EXCLUDE_DIRS[@]}"; do PRUNE_EXPR+=( -path "$ROOT/$d" -o ); done
((${#PRUNE_EXPR[@]})) && unset 'PRUNE_EXPR[${#PRUNE_EXPR[@]}-1]'

FIND_CMD=( find "$ROOT" )
((${#PRUNE_EXPR[@]})) && FIND_CMD+=( \( "${PRUNE_EXPR[@]}" \) -prune -o )
FIND_CMD+=( -type f )

# Escludi sempre l'output stesso (sia se è in ROOT che altrove)
OUT_BASENAME="$(basename "$OUT")"
FIND_CMD+=( ! -name "$OUT_BASENAME" ! -path "$ROOT/$OUT_BASENAME" )

# (Opz.) escludi binari per non appesantire
if (( INCLUDE_BIN == 0 )); then
  for g in "${BIN_GLOBS[@]}"; do FIND_CMD+=( ! -iname "$g" ); done
fi
FIND_CMD+=( -print0 )

# Ottieni lista file (NUL-safe), normalizza "./" e ordina
mapfile -d '' -t FILES < <("${FIND_CMD[@]}")
mapfile -d '' -t FILES < <(printf '%s\0' "${FILES[@]}" | sed -z 's|^\./||' | LC_ALL=C sort -z)

TOTAL_FILES=${#FILES[@]}
if (( MAX_FILES > 0 && TOTAL_FILES > MAX_FILES )); then
  FILES=("${FILES[@]:0:MAX_FILES}")
fi

# ===================== 3) HEADER + TREE =====================
OUT_TMP="$(mktemp)"
exec 3>"$OUT_TMP"  # fd 3 = output

{
  echo "# Project Snapshot"
  echo
  echo "Generato: $(date '+%Y-%m-%d %H:%M:%S')"
  echo
  echo "Root: \`$ROOT\` — Esclusi: ${EXCLUDE_DIRS[*]} — Binari inclusi: $([ $INCLUDE_BIN -eq 1 ] && echo sì || echo no)"
  echo "Limiti: $([ $MAX_BYTES_PER_FILE -gt 0 ] && echo "${MAX_BYTES_PER_FILE}B/file" || echo "nessun limite")"
  echo
  echo "## Tree (esclusi: ${EXCL_COMMA:-—})"
  echo
  echo '```'
  cat "$TREE_FILE"
  echo '```'
  echo
  echo "## Contenuti dei file (ordinati per percorso)"
} >&3

# ===================== 4) DUMP CONTENUTI =====================
# Mappa estensione -> linguaggio per code fence
ext_to_lang () {
  case "$1" in
    ts|js|mjs|cjs|jsx|tsx|html|scss|css|less|sass|json|md|yml|yaml|xml|toml|ini|conf|sh|bash|bat|ps1|env|sql|Dockerfile|dockerfile) printf "%s" "$1" ;;
    Dockerfile|dockerfile) printf "dockerfile" ;;
    *) printf "" ;;
  esac
}

COUNT=0
for f in "${FILES[@]}"; do
  lang="$(ext_to_lang "${f##*.}")"
  {
    echo
    echo '---'
    echo
    echo "### ${f}"
    echo
    printf '```%s\n' "$lang"
  } >&3

  # Scrivi contenuto con eventuale troncamento e normalizzazione CRLF
  if (( MAX_BYTES_PER_FILE > 0 )); then
    size=$(wc -c < "$f")
    if (( size > MAX_BYTES_PER_FILE )); then
      if (( NORMALIZE_CRLF == 1 )); then head -c "$MAX_BYTES_PER_FILE" -- "$f" | tr -d '\r' >&3
      else head -c "$MAX_BYTES_PER_FILE" -- "$f" >&3
      fi
      echo -e "\n... [TRONCATO a ${MAX_BYTES_PER_FILE} byte; originale ${size} byte]" >&3
    else
      if (( NORMALIZE_CRLF == 1 )); then tr -d '\r' < "$f" >&3
      else cat -- "$f" >&3
      fi
    fi
  else
    if (( NORMALIZE_CRLF == 1 )); then tr -d '\r' < "$f" >&3
    else cat -- "$f" >&3
    fi
  fi

  echo '```' >&3
  COUNT=$((COUNT+1))
done

exec 3>&-
mv "$OUT_TMP" "$OUT"
echo "Creato ${OUT} — inclusi ${COUNT} file (su ${TOTAL_FILES} trovati)."
