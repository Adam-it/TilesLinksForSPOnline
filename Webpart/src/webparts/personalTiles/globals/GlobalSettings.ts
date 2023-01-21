export default class GlobalSettings {
    public static maxTileNameLength: number = 15;
    public static appDataFolderName: string = 'PersonalTilesApp';
    public static appDataJsonFileName: string = 'PersonalTilesData.json';
    public static httpsProtocol: string = 'https://';
    public static usePredefinedLinks: boolean = true; // Set to true to use predefined links (requires admin site setup)
    public static adminSite: string = 'https://tenanttocheck.sharepoint.com/sites/PersonalLinksAdminSite5';
    public static predifinedList: string = 'Predefined Personal Links';
    public static linkName: string = 'Link_x0020_Name';
    public static linkUrl: string = 'Link_x0020_Url';
    public static linkIconClass: string = 'Link_x0020_Icon_x0020_Class_x002';
}
