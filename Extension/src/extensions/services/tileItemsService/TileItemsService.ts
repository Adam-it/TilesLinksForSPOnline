import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import ITileItemsServiceInput from '../../model/tileItemsService/ITileItemsServiceInput';
import GlobalSettings from '../../globals/GlobalSettings';
import IAppData from '../../model/IAppData';

export default class TileItemsService {

    private clients: ITileItemsServiceInput = null;
    private appDataFolderName: string = null;
    private appDataJsonFileName: string = null;

    constructor(input: ITileItemsServiceInput) {
        this.clients = input;
        this.appDataFolderName = GlobalSettings.appDataFolderName;
        this.appDataJsonFileName = GlobalSettings.appDataJsonFileName;
    }

    public async getAppDataFolder(): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.clients.mSGraphClient
                .api(`/me/drive/special/approot/children?$filter=name eq '${this.appDataFolderName}'`)
                .version('v1.0')
                .get((error: any, response: any, rawResponse?: any) => {
                    if (error) {
                        resolve(error);
                    }

                    resolve(response);
                }));
    }

    public async checkIfAppDataFolderExists(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.getAppDataFolder().then(result => result.value.some((item: any) => item.name === this.appDataFolderName)));
        });
    }

    public async createAppDataFolder(): Promise<string> {
        const driveItem = {
            name: this.appDataFolderName,
            folder: {},
            '@microsoft.graph.conflictBehavior': 'fail'
        };

        return new Promise<string>((resolve, reject) =>
            this.clients.mSGraphClient
                .api('/me/drive/special/approot/children')
                .version('v1.0')
                .post(driveItem)
                .then((result: any) => {
                    if (result != null) {
                        resolve(result.name.toString());
                    }
                }));
    }

    public createOrUpdateJsonDataFile(appData: IAppData): void {
        this.getAppDataFolder()
            .then(response => {
                const id = response.value.filter((item: any) => item.name === this.appDataFolderName)[0].id;
                const stream = JSON.stringify(appData);

                this.clients.mSGraphClient
                    .api(`/me/drive/items/${id}:/${this.appDataJsonFileName}:/content`)
                    .version('v1.0')
                    .put(stream);
            });
    }

    public async getJsonAppDataFile(): Promise<IAppData> {
        return new Promise<IAppData>((resolve, reject) =>
            this.clients.mSGraphClient
                .api(`/me/drive/special/approot:/${this.appDataFolderName}:/children?$filter=name eq '${this.appDataJsonFileName}'`)
                .version('v1.0')
                .get((error: any, response: any, rawResponse?: any) => {
                    if (error) {
                        return;
                    }

                    const downloadUrl = response.value.filter((item: any) => item.name === this.appDataJsonFileName)[0]['@microsoft.graph.downloadUrl'];
                    this.clients.httpClient
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
