param(
  [string]$root     = (Get-Location).Path,
  [string]$src      = $null,
  [string]$out      = $null,
  [string]$include  = '',   # lista separata da ;
  [string]$exclude  = '',   # wildcard relative alla SRC, separate da ;
  [int]   $debug    = 0,    # 0|1
  [int]   $dryrun   = 0     # 0|1
)

$ErrorActionPreference = 'Stop'
$DebugMode = ($debug -eq 1)
$DryRun    = ($dryrun -eq 1)

# Percorsi
$root = (Resolve-Path -LiteralPath $root).ProviderPath
if (-not $src) { $src = Join-Path -Path $root -ChildPath 'src' }
$src  = (Resolve-Path -LiteralPath $src).ProviderPath

# Output di default
if (-not $out) {
  $ts  = Get-Date -Format 'yyyyMMdd_HHmmss'
  $out = Join-Path -Path (Join-Path $root 'exports') -ChildPath ('src-export-{0}.md' -f $ts)
}

# Crea cartella output
$outDir = Split-Path -Path $out -Parent
if (-not (Test-Path -LiteralPath $outDir)) {
  if ($DryRun) { Write-Host '[DRYRUN] mkdir ' $outDir }
  else { New-Item -ItemType Directory -Path $outDir | Out-Null }
}

# Log iniziali
Write-Host ('[INFO] ROOT             = {0}' -f $root)
Write-Host ('[INFO] SRC              = {0}' -f $src)
Write-Host ('[INFO] OUT              = {0}' -f $out)
Write-Host ('[INFO] INCLUDE_FILES    = {0}' -f $include)
Write-Host ('[INFO] EXCLUDE_PATTERNS = {0}' -f $exclude)
Write-Host ('[INFO] DEBUG            = {0}' -f $debug)
Write-Host ('[INFO] DRYRUN           = {0}' -f $dryrun)

function FenceFromExt([string]$ext) {
  switch ($ext.ToLower()) {
    '.ts' { 'ts' }
    '.tsx' { 'ts' }
    '.js' { 'js' }
    '.jsx' { 'js' }
    '.html' { 'html' }
    '.scss' { 'scss' }
    '.sass' { 'scss' }
    '.css' { 'css' }
    '.json' { 'json' }
    '.md' { 'md' }
    '.yml' { 'yaml' }
    '.yaml' { 'yaml' }
    '.sql' { 'sql' }
    '.xml' { 'xml' }
    default { 'txt' }
  }
}

# Tree ASCII puro (senza cmd)
function Write-TreeRec([string]$path, [string]$indent, [string]$outFile) {
  $name = Split-Path -Path $path -Leaf
  $line = if ($indent -eq '') { $name } else { $indent + '|-- ' + $name }
  if (-not $DryRun) { $line | Out-File -FilePath $outFile -Append -Encoding utf8 } else { Write-Host '[DRYRUN] ' $line }

  $childrenFiles = Get-ChildItem -LiteralPath $path -File | Sort-Object Name
  foreach ($f in $childrenFiles) {
    $fl = $indent + '|   |-- ' + $f.Name
    if (-not $DryRun) { $fl | Out-File -FilePath $outFile -Append -Encoding utf8 } else { Write-Host '[DRYRUN] ' $fl }
  }

  $childrenDirs = Get-ChildItem -LiteralPath $path -Directory | Sort-Object Name
  foreach ($d in $childrenDirs) {
    Write-TreeRec -path $d.FullName -indent ($indent + '|   ') -outFile $outFile
  }
}

# Header e sezione TREE
if (-not $DryRun) {
  '# EXPORT SRC' | Out-File -FilePath $out -Encoding utf8
  ('Generato: {0}' -f (Get-Date)) | Out-File -FilePath $out -Append -Encoding utf8
  '' | Out-File -FilePath $out -Append -Encoding utf8
  '## Tree di ' + $src | Out-File -FilePath $out -Append -Encoding utf8
  '```text' | Out-File -FilePath $out -Append -Encoding utf8
}
Write-TreeRec -path $src -indent '' -outFile $out
if (-not $DryRun) {
  '```' | Out-File -FilePath $out -Append -Encoding utf8
  ''    | Out-File -FilePath $out -Append -Encoding utf8
  '## File e contenuti (src)' | Out-File -FilePath $out -Append -Encoding utf8
  ''    | Out-File -FilePath $out -Append -Encoding utf8
}

# Elenco file src
$srcFull = $src
$files = Get-ChildItem -Path $src -Recurse -File | Sort-Object FullName

# Esclusioni
if ($exclude -and $exclude.Trim() -ne '') {
  $patterns = $exclude -split ';'
  if ($DebugMode) { Write-Host ('[DEBUG] EXCLUDE patterns: {0}' -f ($patterns -join ', ')) }
  $files = $files | Where-Object {
    $rel = $_.FullName.Substring($srcFull.Length)
    if ($rel.StartsWith('\')) { $rel = $rel.Substring(1) }
    $hit = $false
    foreach ($p in $patterns) {
      if ($rel -like $p) { $hit = $true; break }
    }
    -not $hit
  }
}

# Dump contenuti
foreach ($f in $files) {
  $full  = $f.FullName
  $rel   = $full.Substring($srcFull.Length)
  if ($rel.StartsWith('\')) { $rel = $rel.Substring(1) }
  $fence = FenceFromExt $f.Extension

  if ($DryRun) {
    Write-Host ('[DRYRUN] Dump: src\{0}' -f $rel)
  } else {
    ('### FILE: src\{0}' -f $rel) | Out-File -FilePath $out -Append -Encoding utf8
    ('```{0}' -f $fence) | Out-File -FilePath $out -Append -Encoding utf8
    try {
      Get-Content -LiteralPath $full -Raw -Encoding utf8 | Out-File -FilePath $out -Append -Encoding utf8
    } catch {
      Get-Content -LiteralPath $full -Raw                | Out-File -FilePath $out -Append -Encoding utf8
    }
    '```' | Out-File -FilePath $out -Append -Encoding utf8
    ''     | Out-File -FilePath $out -Append -Encoding utf8
  }
}

# File extra
if ($include -and $include.Trim() -ne '') {
  if (-not $DryRun) {
    '' | Out-File -FilePath $out -Append -Encoding utf8
    '## File extra' | Out-File -FilePath $out -Append -Encoding utf8
    '' | Out-File -FilePath $out -Append -Encoding utf8
  }

  $inc = $include -split ';'
  foreach ($i in $inc) {
    $p = $i.Trim("'", '"', "`t", ' ')
    if (-not [System.IO.Path]::IsPathRooted($p)) { $p = Join-Path -Path $root -ChildPath $p }
    if (Test-Path -LiteralPath $p) {
      $ext   = [System.IO.Path]::GetExtension($p)
      $fence = FenceFromExt $ext
      $disp  = (Resolve-Path -LiteralPath $p).ProviderPath
      if ($DryRun) {
        Write-Host ('[DRYRUN] Extra: {0}' -f $disp)
      } else {
        ('### FILE: {0}' -f $disp) | Out-File -FilePath $out -Append -Encoding utf8
        ('```{0}' -f $fence)       | Out-File -FilePath $out -Append -Encoding utf8
        try {
          Get-Content -LiteralPath $p -Raw -Encoding utf8 | Out-File -FilePath $out -Append -Encoding utf8
        } catch {
          Get-Content -LiteralPath $p -Raw                | Out-File -FilePath $out -Append -Encoding utf8
        }
        '```' | Out-File -FilePath $out -Append -Encoding utf8
        ''     | Out-File -FilePath $out -Append -Encoding utf8
      }
    } else {
      if (-not $DryRun) { ('ATTENZIONE: file non trovato: {0}' -f $p) | Out-File -FilePath $out -Append -Encoding utf8 }
      if ($DebugMode)   { Write-Host ('[DEBUG] Extra NON trovato: {0}' -f $p) -ForegroundColor Yellow }
    }
  }
}

if (-not $DryRun) { Write-Host ('Fatto! File creato: {0}' -f $out) -ForegroundColor Green }
