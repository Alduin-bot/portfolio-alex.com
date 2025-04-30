@echo off
SETLOCAL

:: Aller dans le dossier du script (ton projet)
cd /d "%~dp0"

echo ▶️ Construction du site...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur dans "npm run build"
    pause
    exit /b
)

echo 🔁 Ajout des fichiers modifiés...
call git add .

echo 💬 Commit des changements...
call git commit -m "Mise à jour automatique"

echo 🚀 Push vers GitHub...
call git push

echo ✅ Terminé ! Netlify va mettre à jour ton site.
pause
