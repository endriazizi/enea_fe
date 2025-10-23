#!/usr/bin/env bash
# =====================================================
# export-all-with-contents.sh
# Esporta in un unico Markdown:
#   1) TREE completo di ./src (se esiste)
#   2) INDICE di TUTTI i file (dopo esclusioni): size, linee, path
#   3) CONTENUTO di TUTTI i file testuali con intestazione "nome file" + "percorso"
#      (file binari saltati a meno che INCLUDE_BINARY=1)
#
# Pensato per progetti Angular (ma generico). Evita di entrare in node_modules, dist, build, ecc.
#
# USO:
#   chmod +x export-all-with-contents.sh
#   ./export-all-with-contents.sh                   # genera PROJECT_FULL_EXPORT.md
#   ROOT=/path/to/project OUT=export.md ./export-all-with-contents.sh
#
# ENV opzionali:
#   ROOT (default .)                 → radice progetto
#   OUT (default PROJECT_FULL_EXPORT.md)
#   SRC_DIR (default $ROOT/src)      → per TREE iniziale
#   EXCLUDE_PATTERNS (default vedi sotto, separatore ':')
#   INCLUDE_BINARY=1                 → include anche binari (sconsigliato)
#
set -euo pipefail

# ---------- Config ----------
ROOT="${ROOT:-${1:-.}}"
OUT="${OUT:-PROJECT_FULL_EXPORT.md}"
SRC_DIR="${SRC_DIR:-$ROOT/src}"
TITLE="${TITLE:-Project Full Export (tree + index + full contents)}"

# Esclusioni predefinite per progetti web/Angular (aggiungi/override via env)
EXCLUDE_PATTERNS="${EXCLUDE_PATTERNS:-*/.git/*:*/.angular/*:*/dist/*:*/build/*:*/coverage/*:*/node_modules/*:*/www/*:*/.next/*:*/.cache/*:*/tmp/*:*/out/*:*/.output/*}"
INCLUDE_BINARY="${INCLUDE_BINARY:-0}"

# ---------- Helpers ----------
die() { echo "❌ $*" >&2; exit 1; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

# Portable filesize (bytes)
filesize() {
  if command_exists stat; then
    # Linux/GNU
    stat -c%s "$1" 2>/dev/null && return
    # macOS/BSD fallback
    stat -f%z "$1" 2>/dev/null && return
  fi
  wc -c <"$1" 2>/dev/null | tr -d ' '
}

# Guess code fence language from extension
code_lang() {
  local f="$1"
  case "${f##*.}" in
    ts) echo "ts" ;;
    tsx) echo "tsx" ;;
    js) echo "js" ;;
    jsx) echo "jsx" ;;
    html|htm) echo "html" ;;
    css) echo "css" ;;
    scss|sass) echo "scss" ;;
    json) echo "json" ;;
    yml|yaml) echo "yaml" ;;
    md|markdown) echo "" ;;
    sh|bash) echo "bash" ;;
    ps1) echo "powershell" ;;
    sql) echo "sql" ;;
    xml) echo "xml" ;;
    txt|env|properties|editorconfig|prettierrc|eslintrc) echo "" ;;
    *) echo "" ;;
  esac
}

# 0 se testuale, 1 se binario
is_text_file() {
  LC_ALL=C grep -Iq . "$1"
}

relpath() {
  local p="$1"
  p="${p#$ROOT/}"
  echo "$p"
}

# Applica i pattern di esclusione; 0=keep, 1=drop
keep_path() {
  local p="$1"
  IFS=':' read -r -a pats <<<"$EXCLUDE_PATTERNS"
  for pat in "${pats[@]}"; do
    [[ -z "$pat" ]] && continue
    if [[ "$p" == $pat ]]; then
      return 1
    fi
  done
  return 0
}

# ---------- Validazioni ----------
[[ -d "$ROOT" ]] || die "ROOT non trovata: $ROOT"

OUT_ABS="$(cd "$(dirname -- "$OUT")" 2>/dev/null && pwd -P)/$(basename -- "$OUT")"

# ---------- Raccolta file ----------
mapfile -d '' ALL_FILES < <(find "$ROOT" -type f -print0)

FILES=()
for f in "${ALL_FILES[@]}"; do
  # escludi il file di output se sta dentro ROOT
  if [[ "$f" == "$OUT_ABS" ]]; then
    continue
  fi
  if keep_path "$f"; then
    FILES+=("$f")
  fi
done

# Ordina alfabeticamente per path relativo
IFS=$'\n' FILES=($(LC_ALL=C printf '%s\n' "${FILES[@]}" | sort))
unset IFS

TOTAL_FILES=${#FILES[@]}
[[ $TOTAL_FILES -gt 0 ]] || die "Nessun file trovato (dopo esclusioni)."

# ---------- Header ----------
{
  echo "# $TITLE"
  echo
  echo "- **Root:** \`$(cd "$ROOT" && pwd)\`"
  if [[ -d "$SRC_DIR" ]]; then
    echo "- **SRC:** \`$(cd "$SRC_DIR" && pwd)\`"
  fi
  if command_exists git && git -C "$ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    COMMIT=$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || echo "n/a")
    BRANCH=$(git -C "$ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "n/a")
    echo "- **Git:** branch \`$BRANCH\`, commit \`$COMMIT\`"
  fi
  echo "- **Generato:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
  echo "- **File inclusi (dopo esclusioni):** $TOTAL_FILES"
  echo
  echo "---"
} > "$OUT"

# ---------- Sezione 1: TREE di src ----------
{
  echo
  echo "## 1) Tree di \`src\`"
  echo
} >> "$OUT"

if [[ -d "$SRC_DIR" ]]; then
  if command_exists tree; then
    ( cd "$SRC_DIR" && tree -a ) >> "$OUT" || true
  else
    {
      echo '```'
      ( cd "$SRC_DIR" && \
        LC_ALL=C find . -print | sed 's|^\./||' | LC_ALL=C sort | \
        while IFS= read -r p; do
          [[ -z "$p" ]] && continue
          depth=$(awk -F'/' '{print NF-1}' <<<"$p")
          indent=""
          for ((i=0; i<depth; i++)); do indent="$indent  "; done
          if [[ -d "$p" ]]; then
            echo "${indent}${p##*/}/"
          else
            echo "${indent}${p##*/}"
          fi
        done
      )
      echo '```'
      echo
      echo "> ℹ️ Installa \`tree\` per un output più leggibile (sudo apt install tree / brew install tree)."
    } >> "$OUT"
  fi
else
  {
    echo "_SRC_DIR non presente. Salto il tree di src._"
  } >> "$OUT"
fi

# ---------- Sezione 2: Indice di tutti i file ----------
{
  echo
  echo "---"
  echo
  echo "## 2) Indice di tutti i file (dopo esclusioni)"
  echo
  echo "| # | Size | Lines | Path |"
  echo "|---:|----:|-----:|:-----|"
} >> "$OUT"

i=0
for f in "${FILES[@]}"; do
  ((i++))
  sz=$(filesize "$f" || echo 0)
  lines=$(wc -l <"$f" 2>/dev/null || echo 0)
  rp=$(relpath "$f")
  echo "| $i | ${sz} B | $lines | \`$rp\` |" >> "$OUT"
done

# ---------- Sezione 3: Contenuti completi ----------
{
  echo
  echo "---"
  echo
  echo "## 3) Contenuti completi dei file"
  echo
} >> "$OUT"

i=0
for f in "${FILES[@]}"; do
  ((i++))
  rp=$(relpath "$f")
  bn="$(basename -- "$f")"
  lang=$(code_lang "$f")

  if [[ "$INCLUDE_BINARY" -eq 0 ]]; then
    if ! is_text_file "$f"; then
      {
        echo ""
        echo "### $i) $bn"
        echo ""
        echo "- **Path:** \`$rp\`"
        echo "- **Tipo:** _(binario — saltato)_"
      } >> "$OUT"
      continue
    fi
  fi

  {
    echo ""
    echo "### $i) $bn"
    echo ""
    echo "- **Path:** \`$rp\`"
    echo "- **Dimensione:** $(filesize "$f" 2>/dev/null || echo 0) B"
    echo ""
    if [[ -n "$lang" ]]; then
      echo '```'"$lang"
    else
      echo '```'
    fi
    cat "$f"
    echo
    echo '```'
  } >> "$OUT"
done

echo "✅ Export completo → $OUT"
