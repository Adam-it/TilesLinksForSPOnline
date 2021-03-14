import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import AddTileDialogContent from './AddTileDialogContent';
import TileItemsService from '../../../services/tileItemsService/TileItemsService';

export default class AddTileDialog extends BaseDialog {
  private itemUrl: string;
  private itemName: string;
  private siteUrl: string;
  private tileItemsService: TileItemsService;
  private showError: boolean;
  private isFolder: boolean;
  private fileType: string;

  constructor(
    itemName: string,
    itemUrl: string,
    siteUrl: string,
    isFolder: boolean,
    fileType: string,
    tileItemsService: TileItemsService) {
    super();
    this.itemName = itemName;
    this.itemUrl = itemUrl;
    this.siteUrl = siteUrl;
    this.tileItemsService = tileItemsService;
    this.isFolder = isFolder;
    this.fileType = fileType;
    this.showError = false;
  }

  public render(): void {
    const url: string = `${this.siteUrl}${this.itemUrl}`;
    ReactDOM.render(<AddTileDialogContent
      name={this.itemName}
      url={url}
      showError={this.showError}
      isFolder={this.isFolder}
      isItem={this.fileType === ''}
      fileType={this.fileType}
      close={this.close}
      onAddNewTile={this.onAddNewTile.bind(this)}
    />, this.domElement);
  }

  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: false
    };
  }

  private onAddNewTile(name: string, url: string, icon: string): void {
    this.tileItemsService
      .getJsonAppDataFile()
      .then(appData => {
        if (appData === null) {
          this.showError = true;
        } else {
          let nextItemId = appData.userTiles.map(item => item.id).sort((a, b) => b - a)[0];
          if (!nextItemId) {
            nextItemId = 0;
          }
          nextItemId = nextItemId + 1;
          appData.userTiles.push({
            id: nextItemId,
            url,
            value: name,
            iconName: icon
          });

          this.tileItemsService.createOrUpdateJsonDataFile(appData);
          this.close();
        }
      });
  }
}