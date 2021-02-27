import { MSGraphClient, HttpClient } from '@microsoft/sp-http';

export default interface ITileItemsServiceInput{
    mSGraphClient: MSGraphClient;
    httpClient: HttpClient;
}