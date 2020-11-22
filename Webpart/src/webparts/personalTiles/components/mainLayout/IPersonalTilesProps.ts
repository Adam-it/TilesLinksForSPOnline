import { WebPartContext } from '@microsoft/sp-webpart-base';
import IWebpartLabelConfig from '../../model/IWebpartLabelConfig';

export default interface IPersonalTilesProps {
    webpartLabelConfig: IWebpartLabelConfig;
    context: WebPartContext;
}