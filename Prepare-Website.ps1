param([string]$Url)

$ErrorActionPreference = 'Stop'
if (!$Url) {
    $Url = Read-Host 'Cloudflare dashboard ka production HTTPS URL'
}
$uri = $null
if (![Uri]::TryCreate($Url.Trim(), [UriKind]::Absolute, [ref]$uri) -or
    $uri.Scheme -ne 'https' -or $uri.UserInfo -or $uri.Query -or $uri.Fragment -or
    $uri.AbsolutePath -ne '/') {
    throw 'Root HTTPS URL dein, jaise https://nexa-software-downloads.pages.dev'
}
$target = $uri.GetLeftPart([UriPartial]::Authority)
$dist = Join-Path $PSScriptRoot 'dist'
$sitemap = Join-Path $dist 'sitemap.xml'
[xml]$sitemapXml = [IO.File]::ReadAllText($sitemap)
$home = [uri]$sitemapXml.urlset.url[0].loc
$current = $home.GetLeftPart([UriPartial]::Authority)
$encoding = New-Object System.Text.UTF8Encoding($false)

$metadataFiles = @(
    Get-ChildItem -LiteralPath $dist -Recurse -File -Filter index.html
    Get-Item -LiteralPath $sitemap, (Join-Path $dist 'robots.txt')
)
foreach ($file in $metadataFiles) {
    $original = [IO.File]::ReadAllText($file.FullName)
    $updated = $original.Replace($current, $target)
    if ($updated -cne $original) {
        [IO.File]::WriteAllText($file.FullName, $updated, $encoding)
    }
}

$archive = Join-Path $PSScriptRoot 'Nexa-Software-Pages-Upload.zip'
Compress-Archive -Path (Join-Path $dist '*') -DestinationPath $archive -Force
Write-Host "Website URL: $target"
Write-Host "Cloudflare Pages upload ZIP: $archive" -ForegroundColor Green
