import { MSGraphClientV3, HttpClient } from '@microsoft/sp-http';

export default interface ITileItemsServiceInput{
    mSGraphClient: MSGraphClientV3;
    httpClient: HttpClient;
}
