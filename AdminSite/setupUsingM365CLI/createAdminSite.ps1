$configFileName = '..\installationConfig'

# import module
Import-Module '..\modules\supportModules.psd1' -Force

# Created log file for script and start logs in file
New-LogFile -FileName 'installationLogs' -FolderName '.logs'
Add-Log -Level "INFO" -Message "==========START=========="
Add-Log -Level "INFO" -Message "Personal Links Admin Site - setup"

# Get json config file
Add-Log -Level "INFO" -Message "Loading configuration file"
$isAbleToLoadConfigFile = Get-Config -JsonConfigFileName $configFileName
if($isAbleToLoadConfigFile -eq $false)
{
    Add-Log -Level "ERROR" -Message "Error when loading configuration file -> exit"
    exit
}
Add-Log -Level "INFO" -Message "Configuration file loaded"

# Login
Add-Log -Level "INFO" -Message "Please login"
m365 login

# Creating site
Add-Log -Level "INFO" -Message "Creating Site"
$siteConfig = $global:JsonConfig.site
$site = m365 spo site get --url $siteConfig.siteUrl
if ($site -like '*Error*') {
    Add-Log -Level "INFO" -Message "Site does not exist - creating site"
    $site = m365 spo site add --type $siteConfig.siteType --title $siteConfig.siteName --url $siteConfig.siteUrl
}
else {
    Add-Log -Level "INFO" -Message "Site already exists - modifying the site title"
    m365 spo site set --url $siteConfig.siteUrl --title $siteConfig.siteName
}

# Creating list
$listConfig = $global:JsonConfig.lists
foreach($listItem in $listConfig)
{
    $listName = $listItem.listName
    Add-Log -Level "INFO" -Message "Creating List - $listName"
    $list = m365 spo list get --title $listName --webUrl $siteConfig.siteUrl
    if ($list -like '*Error*') {
        Add-Log -Level "INFO" -Message "List - $listName - does not exist - creating list"
        $list = m365 spo list add --title $listName --baseTemplate $listItem.listType --webUrl $siteConfig.siteUrl
    }
    else {
        Add-Log -Level "INFO" -Message "List - $listName - already exists"
    }

    foreach($fieldItem in $listItem.fields)
    {
        # Creating columns
        $fieldName = $fieldItem.fieldName
        Add-Log -Level "INFO" -Message "Creating Field - $fieldName"
        $columnLinkName =  m365 spo field get --webUrl $siteConfig.siteUrl --listUrl "Lists/$listName" --fieldTitle $fieldName
        if ($columnLinkName -like '*Error*') {
            Add-Log -Level "INFO" -Message "Field - $fieldName - does not exist - creating field"
            m365 spo field add --webUrl $siteConfig.siteUrl --listTitle $listName --xml $fieldItem.fieldXml
        }
        else {
            Add-Log -Level "INFO" -Message "Field - $fieldName - already exists"
        }
    }
}

#add view to list 
# set home page to the list view

Add-Log -Level "INFO" -Message "===========END==========="