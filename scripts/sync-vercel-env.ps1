# sync-vercel-env.ps1
# Helper script — reads values from .env.local and syncs them to Vercel.
# NEVER hardcode secrets here. Run from the Blog root directory.
# Usage: .\scripts\sync-vercel-env.ps1

$envFile = Join-Path $PSScriptRoot ".." ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Error ".env.local not found. Run this from the Blog root."
    exit 1
}

# Keys to sync to Vercel (Production + Preview)
$keysToSync = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_JWT_SECRET",
    "SUPABASE_SECRET_KEY",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_USER",
    "POSTGRES_DATABASE",
    "POSTGRES_HOST",
    "POSTGRES_PASSWORD"
)

# Parse .env.local
$envVars = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#=\s]+)\s*=\s*"?(.+?)"?\s*$') {
        $envVars[$matches[1]] = $matches[2]
    }
}

$environments = @("production", "preview")

foreach ($key in $keysToSync) {
    if (-not $envVars.ContainsKey($key)) {
        Write-Warning "  $key not found in .env.local, skipping."
        continue
    }
    $value = $envVars[$key]
    foreach ($env in $environments) {
        Write-Host "Setting $key for $env..." -ForegroundColor Cyan
        $value | npx vercel env rm $key $env --yes 2>$null
        $value | npx vercel env add $key $env 2>&1
    }
}

Write-Host "`n✅ Done! Redeploy with: npx vercel --prod" -ForegroundColor Green
