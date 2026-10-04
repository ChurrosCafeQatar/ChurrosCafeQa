$ErrorActionPreference = "Continue"

$urls = @(
    "https://media.finedinemenu.com/fit-in/filters:strip_exif()/filters:format(webp)/120x58/filters:upscale()/2qLjvV0Eu/c63263bc-e69d-426d-97ca-9e7b08378499.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1431x716/2qLjvV0Eu/f7655a24-9f1b-41d1-91d5-00a8083eaaf4.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/c4b31739-3a4e-45d1-9207-4afdddcb3658.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/6065b12e-d417-494d-8be6-4e2e58c24e24.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/dbdba085-8f5e-43e3-9424-59b9e7c47569.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/422769d2-6a57-4260-ada2-cd7cf4fcc933.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/8105d5a3-7133-4a8c-b171-94c7fb589801.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/2da22404-e568-4659-9264-8934116aa965.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/347972e7-cecd-40da-984a-ebc8c49e0867.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/104x78/2qLjvV0Eu/6ff94f62-daa3-4efc-980a-ea4341c673c1.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/c4b31739-3a4e-45d1-9207-4afdddcb3658.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/217d1f7d-f79f-48d2-b60b-9fd1e59af612.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/dbd32763-8b0f-4520-8aa1-cda18b9f5af5.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/5c9d5002-f435-4ebf-9491-4251a2be264e.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/f16f6456-0835-41c9-8067-0ed3b0f3cfb0.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/acf0b552-5021-4e30-a1c7-d4657497f7b4.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/8d88c7ab-2d65-42aa-8c8b-c83911521c00.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/3290b92a-e42f-4505-a88c-9b9a42bfa827.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/6065b12e-d417-494d-8be6-4e2e58c24e24.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/6f84b9c3-7989-485f-aacf-6162195736dd.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/d658d7e0-56ef-46da-8e4b-d45872203969.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/42371531-58d5-4930-a105-3555940e666a.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/356b5e6f-3ed3-4d04-af47-270fb5931d65.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/dbdba085-8f5e-43e3-9424-59b9e7c47569.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/5b40c3c6-2e40-48c5-8583-e44423f1f756.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/ce66ad95-8254-4032-ade7-bcf097150e04.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/628d7c44-fb07-419e-adbf-91d190838a7a.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/6e3d5dcb-37f3-493b-ad6a-11fcaff1f155.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/ea6cb5ea-7a8e-4abb-91cc-2a7f35e95c74.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/7821a71b-cccf-4007-9699-28e3c80eb301.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/729294a7-ca67-4461-a311-44971dd6c931.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/dc67dfd9-5da2-4599-9e06-fb9dc318eb88.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/422769d2-6a57-4260-ada2-cd7cf4fcc933.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/afa51679-6d7d-425b-b7f8-791ff883feed.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/0a08e385-e613-41a6-b82e-e7b45dd0314c.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/774b0fae-536a-4531-958b-1ea8802c389e.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/46b10c09-d31b-4b93-a662-41de217ababe.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/0c54d1f5-9413-44d9-a12c-2058d2008ab8.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/9273fa4c-f4b0-4f3e-a96c-0ec53b936899.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/058c0d91-86b1-40aa-9df4-891c83c6ab51.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/7a359274-e58c-40f9-9422-aac5e011b513.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/ef28f27a-d557-4039-9531-b6c58b7c363f.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/0ee67fce-0262-4056-a59f-c9bdb9d1eabb.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/8105d5a3-7133-4a8c-b171-94c7fb589801.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/a1a84a4e-4d53-4882-bfd3-4ba5d5b6a673.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/1d9355ac-f734-41f6-99e0-4b5387498a85.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/fba16e6e-a3df-49cd-bc3c-8e284d06cd68.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/34eb2f68-8544-4955-9e41-3b9a0eb81024.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/5e1e39ee-f0ed-4289-b7c1-d6ac48a4c5d8.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/b41f3f3e-ea34-4250-b62a-ef10f5184714.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/37ceb282-2d7a-43e0-b928-d571a18d07b3.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/e96182dc-ee83-4b6a-8fc7-baf11e123abf.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/3cd1a6aa-3eb5-44df-8987-fb93f0667155.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/2da22404-e568-4659-9264-8934116aa965.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/52c6fa70-98b7-4604-a4db-4745e93aff3f.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/07824f38-b56a-44a8-9088-6ebadc040360.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/7c5f9fb2-415a-4c5f-8e8e-ba2a96d72926.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/6df5190e-43c3-4c36-9691-35acfabfb80f.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/2d5ca4b2-3d27-464a-ad8e-b18063b81578.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/d859dde4-6861-415b-8d8e-409fd012f0a9.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/ff06148b-71d7-4bea-b00a-4815b91f46ba.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/a920c3e4-c95d-44f6-bc4a-10eaa9f6f4fa.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/3e7891b9-d1a3-4881-bd91-06ffb2d17cb9.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/347972e7-cecd-40da-984a-ebc8c49e0867.png"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/59d2d624-6025-46d8-8d2e-a3be65ad528e.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/5a74e2a1-99e0-4bb7-b9a8-a7802b1575a4.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x592/2qLjvV0Eu/015642c1-350b-43a8-a007-4d658309adb0.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/0c7761d5-f9e4-4cf2-9986-f1cb182d1d4e.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/1423x474/2qLjvV0Eu/6ff94f62-daa3-4efc-980a-ea4341c673c1.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/4fb38ee7-5625-45e3-9ffe-6810a116a23d.jpeg"
    "https://media.finedinemenu.com/filters:strip_exif()/filters:format(webp)/592x0/2qLjvV0Eu/8e100108-c418-4902-8fd8-5d18ea2da3d1.jpeg"
)

$downloadRoot = Join-Path $env:USERPROFILE "Downloads\Churros_Menu_Images"
$zipPath = Join-Path $env:USERPROFILE "Downloads\Churros_Menu_Images.zip"
$csvPath = Join-Path $downloadRoot "image_manifest.csv"

New-Item -ItemType Directory -Path $downloadRoot -Force | Out-Null

function Get-AssetId($url) {
    if ($url -match "/([0-9a-fA-F-]{36})\.(png|jpe?g)$") {
        return $matches[1].ToLower()
    }
    return [guid]::NewGuid().ToString()
}

function Get-Score($url) {
    if ($url -match "/(\d+)x(\d+)/2qLj") {
        $w = [int]$matches[1]
        $h = [int]$matches[2]
        if ($h -eq 0) { $h = $w }
        return $w * $h
    }
    if ($url -match "/(\d+)x(\d+)/filters:upscale") {
        $w = [int]$matches[1]
        $h = [int]$matches[2]
        return $w * $h
    }
    return 0
}

# Deduplicate by underlying FineDine asset UUID.
# If the same image appears in thumbnail/banner/full-size variants, keep the largest.
$best = @{}

foreach ($url in $urls) {
    $id = Get-AssetId $url
    $score = Get-Score $url

    if (-not $best.ContainsKey($id)) {
        $best[$id] = [PSCustomObject]@{ Url = $url; Score = $score }
    }
    elseif ($score -gt $best[$id].Score) {
        $best[$id] = [PSCustomObject]@{ Url = $url; Score = $score }
    }
}

Write-Host ""
Write-Host ("Input URLs: " + $urls.Count)
Write-Host ("Unique assets: " + $best.Count)
Write-Host ""

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/153 Safari/537.36"
    "Referer" = "https://qr.finedinemenu.com/"
}

$manifest = @()
$i = 1

foreach ($entry in $best.GetEnumerator()) {
    $id = $entry.Key
    $url = $entry.Value.Url

    $fileName = ("menu-image-" + $i.ToString("D3") + "-" + $id + ".webp")
    $outFile = Join-Path $downloadRoot $fileName

    Write-Host ("[" + $i + "/" + $best.Count + "] " + $fileName)

    $status = "Downloaded"

    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -Headers $headers -MaximumRedirection 10

        if ((Get-Item $outFile).Length -eq 0) {
            throw "Downloaded file is empty."
        }
    }
    catch {
        $status = "Failed"
        Write-Host ("FAILED: " + $_.Exception.Message) -ForegroundColor Red
    }

    $manifest += [PSCustomObject]@{
        Number = $i
        AssetId = $id
        Filename = $fileName
        Status = $status
        SourceURL = $url
    }

    $i++
}

$manifest | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$downloaded = Get-ChildItem $downloadRoot -Filter "*.webp"

if ($downloaded.Count -gt 0) {
    Compress-Archive -Path (Join-Path $downloadRoot "*.webp"), $csvPath -DestinationPath $zipPath -Force
}

Write-Host ""
Write-Host "========================================"
Write-Host ("Downloaded: " + $downloaded.Count)
Write-Host ("Folder: " + $downloadRoot)
Write-Host ("ZIP: " + $zipPath)
Write-Host ("Manifest: " + $csvPath)
Write-Host "========================================"
Write-Host ""
Write-Host "Press Enter to close..."
Read-Host
