# Create new log file
function New-LogFile(
    [Parameter(Mandatory=$True)][string]$FileName, 
    [Parameter(Mandatory=$True)][string]$FolderName)
{
	$IsFolderPresent = Test-Path ".\$FolderName\logs"
	if($IsFolderPresent -eq $false)
	{
		New-Item -Path ".\$FolderName\logs" -ItemType Directory
    }
    $FileName = $FileName + (Get-Date).toString('yyyyMMddHHmmss')
	$Path = ".\$FolderName\logs\$FileName.log"
	$global:LogFile = New-Item -Path $Path -ItemType File
}
Export-ModuleMember -Function 'New-LogFile'

# Add string log to file and output it to the console
function Add-Log(
		[Parameter(Mandatory=$False)][ValidateSet('INFO','WARN','ERROR')][String]$Level = 'INFO',
		[Parameter(Mandatory=$True)][string]$Message)
{
	$TimeStamp = (Get-Date).toString('yyyy/MM/dd HH:mm:ss')
    $Line = "$TimeStamp $Level -> $Message"
    if($global:LogFile)
	{
        Add-Content $global:LogFile -Value $Line -ErrorAction Stop
	}
	$Color = "White"
	if($Level -eq 'WARN')
	{
		$Color = "DarkYellow"
	}
	elseif ($Level -eq 'ERROR') 
	{
		$Color = "DarkRed"
	}
	Write-Host $Line -ForegroundColor $Color
}
Export-ModuleMember -Function 'Add-Log'