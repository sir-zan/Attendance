#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated GitHub Pages Deployment for Attendance Calculator
.DESCRIPTION
    This script automates the entire process of setting up and deploying
    your attendance calculator to GitHub Pages.
#>

$ErrorActionPreference = "Stop"

Write-Host "ATTENDANCE CALCULATOR - GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "[OK] Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git is not installed. Download from https://git-scm.com" -ForegroundColor Red
    exit 1
}

# Get GitHub username
$GitHubUsername = Read-Host "Enter your GitHub username"
if (-not $GitHubUsername) {
    Write-Host "[ERROR] GitHub username required" -ForegroundColor Red
    exit 1
}

$RepositoryName = "attendance-calculator"

$repoUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
$repoPath = Join-Path $env:USERPROFILE "Desktop" $RepositoryName

Write-Host ""
Write-Host "Setup Details:" -ForegroundColor Yellow
Write-Host "  Username: $GitHubUsername"
Write-Host "  Repository: $RepositoryName"
Write-Host "  URL: $repoUrl"
Write-Host "  Local path: $repoPath"
Write-Host ""

$proceed = Read-Host "Proceed? (y/n)"
if ($proceed -ne "y" -and $proceed -ne "Y") {
    Write-Host "Cancelled." -ForegroundColor Yellow
    exit 0
}

# Step 1: Create/check repository folder
Write-Host ""
Write-Host "Setting up repository folder..." -ForegroundColor Cyan

if (Test-Path $repoPath) {
    Write-Host "Repository folder already exists at $repoPath" -ForegroundColor Yellow
    $useExisting = Read-Host "Use existing folder? (y/n)"
    if ($useExisting -ne "y" -and $useExisting -ne "Y") {
        Write-Host "Creating new folder..." -ForegroundColor Yellow
        Remove-Item $repoPath -Recurse -Force
        New-Item -ItemType Directory -Path $repoPath | Out-Null
    }
} else {
    New-Item -ItemType Directory -Path $repoPath | Out-Null
    Write-Host "[OK] Created folder: $repoPath" -ForegroundColor Green
}

# Step 2: Copy files
Write-Host ""
Write-Host "Copying files..." -ForegroundColor Cyan

$currentDir = Get-Location
$filesToCopy = @("Index.html", "styles.css", "script.js", "calc.js", "README.md")

foreach ($file in $filesToCopy) {
    $source = Join-Path $currentDir $file
    $dest = Join-Path $repoPath $file
    
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $dest -Force
        Write-Host "  [OK] Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] Not found: $file" -ForegroundColor Yellow
    }
}

# Step 3: Initialize git repository
Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Cyan

Push-Location $repoPath

git init
git config user.name $GitHubUsername
git config user.email "$GitHubUsername@users.noreply.github.com"

Write-Host "[OK] Git initialized" -ForegroundColor Green

# Step 4: Add and commit
Write-Host ""
Write-Host "Committing files..." -ForegroundColor Cyan

git add .
git commit -m "Initial commit: Attendance Calculator"

Write-Host "[OK] Files committed" -ForegroundColor Green

# Step 5: Instructions for remote setup
Write-Host ""
Write-Host "IMPORTANT - Manual GitHub Setup Required:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create a NEW repository on GitHub:" -ForegroundColor Yellow
Write-Host "   - Go to https://github.com/new" -ForegroundColor Cyan
Write-Host "   - Repository name: $RepositoryName" -ForegroundColor Cyan
Write-Host "   - Description: Attendance Absence Calculator" -ForegroundColor Cyan
Write-Host "   - Visibility: Public (required for GitHub Pages)" -ForegroundColor Cyan
Write-Host "   - Click Create repository" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Copy the commands GitHub shows you and run them:" -ForegroundColor Yellow
Write-Host "   (Use the push an existing repository section)" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Example commands:" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin $repoUrl" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

# Step 6: Enable GitHub Pages
Write-Host "4. Enable GitHub Pages:" -ForegroundColor Yellow
Write-Host "   - Go to repo Settings > Pages" -ForegroundColor Cyan
Write-Host "   - Source: Deploy from branch" -ForegroundColor Cyan
Write-Host "   - Branch: main / (root)" -ForegroundColor Cyan
Write-Host "   - Click Save" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Your site will be live in about 2 minutes at:" -ForegroundColor Green
Write-Host "   https://$GitHubUsername.github.io/$RepositoryName" -ForegroundColor Cyan
Write-Host ""

Write-Host "Repository folder: $repoPath" -ForegroundColor Cyan
Write-Host "Ready to use git commands!" -ForegroundColor Green

Pop-Location

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
