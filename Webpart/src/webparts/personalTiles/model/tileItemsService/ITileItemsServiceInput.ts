import { MSGraphClient, HttpClient, SPHttpClient } from '@microsoft/sp-http';

export default interface ITileItemsServiceInput {
    mSGraphClient: MSGraphClient;
    httpClient: HttpClient;
    spHttpClient: SPHttpClient;
}