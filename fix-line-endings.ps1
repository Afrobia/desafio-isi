# Script para corrigir quebras de linha em todos os arquivos

Write-Host "🔧 Aplicando quebras de linha finais em todos os arquivos..." -ForegroundColor Green

# Encontrar todos os arquivos de código
$files = Get-ChildItem -Recurse -Include *.ts,*.js,*.tsx,*.jsx,*.json,*.md,*.yml,*.yaml,*.prisma -Exclude node_modules,dist,.next,build

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue

        if ($content -ne $null) {
            # Normalizar quebras de linha para LF
            $content = $content -replace "`r`n", "`n"
            $content = $content -replace "`r", "`n"

            # Garantir que termina com quebra de linha
            if (-not $content.EndsWith("`n")) {
                $content += "`n"
            }

            # Salvar com encoding UTF-8
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "✅ $($file.Name)" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "❌ Erro ao processar $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "🎉 Processamento concluído!" -ForegroundColor Green
Write-Host "💡 Agora execute: git add . && git commit -m 'fix: normalize line endings'" -ForegroundColor Yellow

<#
PowerShell script to fix line endings across all project files
@author GitHub Copilot
@created 2025-07-31
@description Normalizes line endings to LF and ensures final newlines for GitHub consistency
#>
