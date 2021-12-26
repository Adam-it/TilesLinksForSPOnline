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
$m365Status = m365 status
if ($m365Status -eq "Logged Out") {
    m365 login
}

# Creating site
Add-Log -Level "INFO" -Message "Creating Site"
$siteConfig = $global:JsonConfig.site
m365 spo site add --type $siteConfig.siteType --title $siteConfig.siteName --url $siteConfig.siteUrl

# Creating list
$listConfig = $global:JsonConfig.lists
foreach($listItem in $listConfig)
{
    $listName = $listItem.listName
    Add-Log -Level "INFO" -Message "Creating List - $listName"
    $list = m365 spo list add --title $listName --baseTemplate $listItem.listType --webUrl $siteConfig.siteUrl

    foreach($fieldItem in $listItem.fields)
    {
        # Creating columns
        $fieldName = $fieldItem.fieldName
        Add-Log -Level "INFO" -Message "Creating Field - $fieldName"
        $columnLinkName =  m365 spo field get --webUrl $siteConfig.siteUrl --listUrl "Lists/$listName" --fieldTitle $fieldName
        $column = m365 spo field add --webUrl $siteConfig.siteUrl --listTitle $listName --xml $fieldItem.fieldXml
    }

    Add-Log -Level "INFO" -Message "Make title field not required"
    m365 spo field set --webUrl $siteConfig.siteUrl --listTitle $listName --updateExistingLists  --name 'Title' --Required 0

    # modify views
    Add-Log -Level "INFO" -Message "Modifying views"
    foreach($view in $listItem.views)
    {
        $viewName = $view.name
        foreach($removeField in $view.removeFields)
        {
            Add-Log -Level "INFO" -Message "Removing field $removeField from view $viewName"
            m365 spo list view field remove --webUrl $siteConfig.siteUrl --fieldTitle $removeField --listTitle $listName --viewTitle $viewName
        }
        foreach($addField in $view.addFields)
        {
            Add-Log -Level "INFO" -Message "adding field $addField from view $viewName"
            m365 spo list view field add --webUrl $siteConfig.siteUrl --listTitle $listName --viewTitle $viewName --fieldTitle $addField
        }
    }
}

Add-Log -Level "INFO" -Message "===========END==========="