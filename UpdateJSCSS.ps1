$version = 14;
if ((Test-Path "version.txt")) {
    $version = (get-content "version.txt");    
    $version = [int]::Parse($version)+1
    set-content "version.txt" $version
    Write-Host "Using version: $version"    
}
gci * -Include *.aspx,*.master,*.html,*.htm -recurse | %{ 
    $content = [System.IO.File]::ReadAllText($_);
    #$content = [regex]::replace($content,'\?v=(\d+)', { '?v=' + ([int]::Parse($args[0].Groups[1].Value)+1) })
    $content = [regex]::replace($content,'\?v=(\d+)*', { '?v=' + $version })
    [System.IO.File]::WriteAllText($_, $content);
}
