import { override } from '@microsoft/decorators';
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
import { MSGraphClientV3 } from '@microsoft/sp-http';

export default class AddTileCommandSetCommandSet extends BaseListViewCommandSet<IAddTileCommandSetCommandSetProperties> {
  private tileItemsService: TileItemsService;
  private fSObjType = 'FSObjType';
  private fileType = 'File_x0020_Type';
  private title = 'Title';
  private fileRef = 'FileRef';
  private fileLeafRef = 'FileLeafRef';

  @override
  public async onInit(): Promise<void> {
    await this.context.msGraphClientFactory
      .getClient('3')
      .then(async (client: MSGraphClientV3): Promise<void> => {
        const input: ITileItemsServiceInput = {
          httpClient: this.context.httpClient as any,
          mSGraphClient: client
        };

        this.tileItemsService = new TileItemsService(input);

        await this.tileItemsService
          .checkIfAppDataFolderExists()
          .then(async (appDataFolderExists): Promise<void> => {
            if (!appDataFolderExists) {
              await this.tileItemsService.createAppDataFolder();
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
  public async onExecute(event: IListViewCommandSetExecuteEventParameters): Promise<void> {
    switch (event.itemId) {
      case 'AddTile':
        if (event.selectedRows.length >= 1) {
          const item: any = event.selectedRows[0];
          const isFolder: boolean = item.getValueByName(this.fSObjType) === '1';
          const fileType: string = item.getValueByName(this.fileType);
          const isItem: boolean = fileType === '';
          const url: string = item.getValueByName(this.fileRef);
          const namme: string = isItem && !isFolder ? item.getValueByName(this.title) : item.getValueByName(this.fileLeafRef);
          const siteUrl: string = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl, '');
          const dialog: AddTileDialog = new AddTileDialog(
            namme,
            url,
            siteUrl,
            isFolder,
            fileType,
            this.tileItemsService);
          await dialog.show();
        }
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
