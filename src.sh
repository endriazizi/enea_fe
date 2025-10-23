#!/usr/bin/env bash
set -euo pipefail

# ===================== CONFIG =====================
OUT="${OUT:-./exports/src-snapshot.md}"   # File markdown di output
SRC_DIR="${SRC_DIR:-./src}"               # Cartella sorgente
MAX_SIZE_KB="${MAX_SIZE_KB:-1024}"        # Salta file > di questa dimensione (KB)
USE_WINDOWS_TREE="${USE_WINDOWS_TREE:-1}" # 1=usa 'tree' di Windows via cmd, 0=usa 'tree' GNU
DEBUG="${DEBUG:-0}"                       # 1=log dettagli, 0=silenzioso
# ==================================================

log()       { echo "[$(date +%H:%M:%S)] $*"; }
log_debug() { [[ "$DEBUG" == "1" ]] && echo "🔍 $*"; }

lang_for() {
  local f="${1,,}"
  case "$f" in
    *.ts) echo "ts" ;;
    *.tsx) echo "tsx" ;;
    *.js) echo "js" ;;
    *.jsx) echo "jsx" ;;
    *.html) echo "html" ;;
    *.css) echo "css" ;;
    *.scss) echo "scss" ;;
    *.sass) echo "sass" ;;
    *.json) echo "json" ;;
    *.md) echo "md" ;;
    *.yml|*.yaml) echo "yaml" ;;
    *.sql) echo "sql" ;;
    *.sh) echo "bash" ;;
    *.xml) echo "xml" ;;
    *.svg) echo "xml" ;;   # trattiamo svg come testo
    *) echo "text" ;;
  esac
}

# Filtra binari e asset non testuali
is_skippable_binary() {
  local f="${1,,}"
  case "$f" in
    *.png|*.jpg|*.jpeg|*.gif|*.webp|*.ico|*.bmp|*.psd|*.ai|*.eps|*.pdf|\
    *.mp3|*.wav|*.ogg|*.mp4|*.webm|*.mov|\
    *.woff|*.woff2|*.ttf|*.otf|*.eot|\
    *.zip|*.rar|*.7z|*.gz|*.tar)
      return 0 ;;
    *) return 1 ;;
  esac
}

file_size_bytes() {
  # Portabile su Git Bash
  local f="$1"
  wc -c < "$f" | tr -d '[:space:]'
}

human_kb() {
  local bytes="$1"
  # arrotonda per eccesso
  awk -v b="$bytes" 'BEGIN { printf "%.0f", (b/1024) + 0.5 }'
}

main() {
  if [[ ! -d "$SRC_DIR" ]]; then
    echo "❌ SRC_DIR non esiste: $SRC_DIR"
    exit 1
  fi

  log "🧾 Genero tree + elenco flat + contenuti per: $SRC_DIR"
  mkdir -p "$(dirname "$OUT")"

  # Header + Tree
  {
    echo "# 📁 Snapshot sorgenti: $SRC_DIR"
    echo
    echo "_Generato: $(date)_"
    echo
    echo "## Tree"
    echo
    echo '```text'
    if [[ "$USE_WINDOWS_TREE" == "1" ]]; then
      ( cd "$SRC_DIR" && cmd //C "chcp 65001 >NUL & tree /F ." )
    else
      tree -a -I ".git|node_modules|dist|.angular|.vscode|coverage" "$SRC_DIR"
    fi
    echo '```'
    echo
  } > "$OUT"

  # Raccogliamo tutti i file testuali candidati (escludendo binari comuni) in modo robusto con -print0
  files=()
  while IFS= read -r -d '' f; do
    files+=("$f")
  done < <(find "$SRC_DIR" \
            \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.ico" -o -name "*.bmp" \
               -o -name "*.psd" -o -name "*.ai" -o -name "*.eps" -o -name "*.pdf" \
               -o -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" -o -name "*.mp4" -o -name "*.webm" -o -name "*.mov" \
               -o -name "*.woff" -o -name "*.woff2" -o -name "*.ttf" -o -name "*.otf" -o -name "*.eot" \
               -o -name "*.zip" -o -name "*.rar" -o -name "*.7z" -o -name "*.gz" -o -name "*.tar" \
            \) -prune -o -type f -print0)

  # Ordiniamo i percorsi (safe per spazi) creando un file temporaneo
  tmp_list="$(mktemp)"
  for f in "${files[@]}"; do
    printf '%s\0' "$f" >> "$tmp_list"
  done
  # sort con NUL separator
  sorted_list="$(mktemp)"
  tr '\0' '\n' < "$tmp_list" | sort | tr '\n' '\0' > "$sorted_list"

  total=0
  while IFS= read -r -d '' _; do ((total++)); done < "$sorted_list"
  log "📦 Trovati $total file candidati."

  # === Sezione: Elenco flat (tabella) ===
  {
    echo "## Elenco file (flat)"
    echo
    echo "| # | Path | Size (KB) |"
    echo "|---:|------|----------:|"
  } >> "$OUT"

  idx=0
  while IFS= read -r -d '' f; do
    ((idx++))
    size_bytes=$(file_size_bytes "$f" || echo 0)
    size_kb=$(human_kb "$size_bytes")
    # Riga in tabella
    printf '| %d | %s | %s |\n' "$idx" "$f" "$size_kb" >> "$OUT"
  done < "$sorted_list"

  echo >> "$OUT"
  echo "## File e contenuti" >> "$OUT"
  echo >> "$OUT"

  # === Sezione: Contenuti ===
  idx=0
  while IFS= read -r -d '' f; do
    ((idx++))
    rel="$f"

    if is_skippable_binary "$f"; then
      log_debug "Skip binario: $f"
      {
        echo "### FILE (skippato binario): $rel"
        echo
      } >> "$OUT"
      continue
    fi

    size_bytes=$(file_size_bytes "$f" || echo 0)
    max_bytes=$(( MAX_SIZE_KB * 1024 ))
    if (( size_bytes > max_bytes )); then
      log_debug "Skip > ${MAX_SIZE_KB}KB: $f ($size_bytes bytes)"
      {
        echo "### FILE (skippato > ${MAX_SIZE_KB}KB): $rel"
        echo
      } >> "$OUT"
      continue
    fi

    lang="$(lang_for "$f")"
    log_debug "Include: $f  (lang=$lang, ${size_bytes}B)"

    {
      echo "### FILE: $rel"
      echo
      echo '```'"$lang"
      cat "$f"
      echo '```'
      echo
    } >> "$OUT"

    # Progress ogni 50 file
    if (( idx % 50 == 0 )); then
      log "…progresso: $idx/$total"
    fi
  done < "$sorted_list"

  rm -f "$tmp_list" "$sorted_list"

  log "✅ Fatto! File salvato in: $OUT"
  echo "✅ Fatto! File salvato in: $OUT"
}

main "$@"
