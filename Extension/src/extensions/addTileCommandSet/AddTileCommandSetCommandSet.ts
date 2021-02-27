import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { MSGraphClient } from "@microsoft/sp-http";
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { IAddTileCommandSetCommandSetProperties } from './IAddTileCommandSetCommandSetProperties';
import AddTileDialog from './components/AddTileDialog/AddTileDialog';
import TileItemsService from '../services/tileItemsService/TileItemsService';
import ITileItemsServiceInput from '../model/tileItemsService/ITileItemsServiceInput';

const LOG_SOURCE: string = 'AddTileCommandSetCommandSet';

export default class AddTileCommandSetCommandSet extends BaseListViewCommandSet<IAddTileCommandSetCommandSetProperties> {
  private _tileItemsService: TileItemsService;


  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized AddTileCommandSetCommandSet');
    this.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        let input: ITileItemsServiceInput = {
          httpClient: this.context.httpClient,
          mSGraphClient: client
        };

        this._tileItemsService = new TileItemsService(input);

        this._tileItemsService
            .checkIfAppDataFolderExists()
            .then(appDataFolderExists => {
              if (!appDataFolderExists){
                this._tileItemsService.createAppDataFolder();
              }
            });
      });
        
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const addTileCommand: Command = this.tryGetCommand('AddTile');
    if (addTileCommand) {
      addTileCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'AddTile':
        if (event.selectedRows.length >= 1) {
          const item: any = event.selectedRows[0];
          const isFolder: boolean = item.getValueByName('FSObjType') === "1";
          const fileType: string = item.getValueByName('File_x0020_Type');
          const isItem: boolean = fileType === "";
          const url: string = item.getValueByName('FileRef');
          const namme: string = isItem && !isFolder ? item.getValueByName('Title') : item.getValueByName('FileLeafRef');
          const siteUrl: string = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl, "");
          const dialog: AddTileDialog = new AddTileDialog(
            namme, 
            url,
            siteUrl,
            isFolder,
            fileType,
            this._tileItemsService);
          dialog.show();
        }
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
