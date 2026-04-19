@echo off
cd /d "c:\Users\ömer\OneDrive\Masaüstü\Finans-rehberi"

echo Initializing git repository...
"C:\Program Files\Git\bin\git.exe" init

echo Adding files...
"C:\Program Files\Git\bin\git.exe" add .

echo Committing...
"C:\Program Files\Git\bin\git.exe" commit -m "Add dynamic routes, SEO optimization, and caching layer"

echo Adding remote...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/YourUsername/finans-rehberi.git

echo Pushing to origin...
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo Done!
pause
