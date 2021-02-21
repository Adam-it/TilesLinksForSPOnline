import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { IAddTileCommandSetCommandSetProperties } from './IAddTileCommandSetCommandSetProperties';
import AddTileDialog from './components/AddTileDialog/AddTileDialog';

const LOG_SOURCE: string = 'AddTileCommandSetCommandSet';

export default class AddTileCommandSetCommandSet extends BaseListViewCommandSet<IAddTileCommandSetCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized AddTileCommandSetCommandSet');
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
          const siteUrl: string = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl, "");
          const dialog: AddTileDialog = new AddTileDialog(
            item.getValueByName('FileLeafRef'), 
            item.getValueByName('FileRef'),
            siteUrl);
          dialog.show();
        }
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
