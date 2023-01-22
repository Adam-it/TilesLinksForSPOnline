export default class GlobalSettings {
    public static maxTileNameLength: number = 15; // number of characters to display in tile name
    public static appDataFolderName: string = 'PersonalTilesApp'; // folder name which will be created in user one drive app folder
    public static appDataJsonFileName: string = 'PersonalTilesData.json'; // json file name which will store the links data saved in user one drive
    public static httpsProtocol: string = 'https://';
    public static usePredefinedLinks: boolean = true; // Set to true to use predefined links (requires admin site setup)
    public static adminSite: string = 'https://tenanttocheck.sharepoint.com/sites/PersonalLinksAdminSite5'; // url of the admin site where the predefined links list is present
    public static predifinedList: string = 'Predefined Personal Links';
    public static linkName: string = 'Link_x0020_Name'; // name of the predefined links list column which has the link name
    public static linkUrl: string = 'Link_x0020_Url'; // name of the predefined links list column which has the link url
    public static linkIconClass: string = 'Link_x0020_Icon_x0020_Class_x002'; // name of the predefined links list column which has the link icon
}
