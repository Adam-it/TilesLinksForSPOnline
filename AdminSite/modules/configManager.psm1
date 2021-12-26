# Get json config file 
function Get-Config([Parameter(Mandatory=$True)][string]$JsonConfigFileName)
{
	$IsAbleToLoadConfigFile = $true
	Try
    {
        Add-Log -Level "INFO" -Message "Getting and parsing config file"
		$global:JsonConfig = Get-Content ".\$JsonConfigFileName.json" | Out-String | ConvertFrom-Json -ErrorAction Stop
	}
	Catch
    {
        Add-Log -Level "INFO" -Message "Error Getting and parsing config file"
        $IsAbleToLoadConfigFile = $false
	}
	return $IsAbleToLoadConfigFile
}
Export-ModuleMember -Function 'Get-Config'