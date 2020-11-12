import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import ITileItemsServiceInput from "../../model/tileItemsService/ITileItemsServiceInput";
import GlobalSettings from "../../globals/GlobalSettings1";
import IAppData from "../../model/IAppData";

export default class TileItemsService {

    private _clients: ITileItemsServiceInput = null;
    private _appDataFolderName: string = null
    private _appDataJsonFileName: string = null

    constructor(input: ITileItemsServiceInput) {
        this._clients = input;
        this._appDataFolderName = GlobalSettings.appDataFolderName;
        this._appDataJsonFileName = GlobalSettings.appDataJsonFileName;
    }

    public async getAppDataFolder(): Promise<any> {
        return new Promise<any>((resolve, reject) => 
        this._clients.mSGraphClient
            .api(`/me/drive/special/approot/children?$filter=name eq '${this._appDataFolderName}'`)
            .version("v1.0")  
            .get((error, response: any, rawResponse?: any) => {
                if (error) {  
                    console.error(error);  
                    resolve(null);  
                }  

                resolve(response);
            }));
    }

    public async checkIfAppDataFolderExists(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.getAppDataFolder().then(result => result.value.some(item => item.name === this._appDataFolderName)));
        });
    }

    public async createAppDataFolder(): Promise<string> {
        const driveItem = {
            name: this._appDataFolderName,
            folder: { },
            "@microsoft.graph.conflictBehavior":"fail"
        };
    
        return new Promise<string>((resolve, reject) => 
        this._clients.mSGraphClient
            .api('/me/drive/special/approot/children')
            .version("v1.0")  
            .post(driveItem)
            .then(result => {
                if (result != null)
                    resolve(result.name.toString());
            }));
    }
    
    public createOrUpdateJsonDataFile(appData: IAppData): void {
        this.getAppDataFolder()
        .then(response => {
            let id = response.value.filter(item => item.name === this._appDataFolderName)[0].id;
            const stream = JSON.stringify(appData);

            this._clients.mSGraphClient
                .api(`/me/drive/items/${id}:/${this._appDataJsonFileName}:/content`)
                .version("v1.0")  
                .put(stream);
        });
    }
    
    public async getJsonAppDataFile(): Promise<IAppData>{
        return new Promise<IAppData>((resolve, reject) => 
        this._clients.mSGraphClient
        .api(`/me/drive/special/approot:/${this._appDataFolderName}:/children?$filter=name eq '${this._appDataJsonFileName}'`)
        .version("v1.0")  
        .get((error, response: any, rawResponse?: any) => {
            if (error) {  
                console.error(error);  
                return;  
            }  

            let downloadUrl = response.value.filter(item => item.name === this._appDataJsonFileName)[0]["@microsoft.graph.downloadUrl"];
            this._clients   .httpClient
            .get(downloadUrl, HttpClient.configurations.v1)
            .then((innerResponse: HttpClientResponse): Promise<string> => {
                if (innerResponse.ok) {
                    return innerResponse.text();
                }
            
                    return Promise.reject(innerResponse.statusText);
            })
            .then((settingsString: string) => {
                const settings: IAppData = JSON.parse(settingsString);
                resolve(settings);
            });
        }));
    }
}




 // ToDo -> the idea was to maybe have some kind of clear the app all data in configuration tab
//   private deleteFolder(){
//     this.state.msGraphclient
//       .api(`/me/drive/special/approot/children?$filter=name eq 'test'`)
//       .version("v1.0")  
//       .get((error, response: any, rawResponse?: any) => {
//         if (error) {  
//           console.error(error);  
//           return;  
//         }  

//         let id = response.value.filter(item => item.name === "test")[0].id;
//         this.state.msGraphclient
//         .api(`/me/drive/items/${id}`)
//         .version("v1.0")  
//         .delete();
//       });
//   }