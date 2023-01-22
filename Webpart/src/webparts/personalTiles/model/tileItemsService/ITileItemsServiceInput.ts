import { MSGraphClientV3, HttpClient, SPHttpClient } from '@microsoft/sp-http';

export default interface ITileItemsServiceInput {
    mSGraphClient: MSGraphClientV3;
    httpClient: HttpClient;
    spHttpClient: SPHttpClient;
}
