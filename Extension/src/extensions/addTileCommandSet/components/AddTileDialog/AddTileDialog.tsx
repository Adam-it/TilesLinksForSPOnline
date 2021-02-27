import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import AddTileDialogContent from './AddTileDialogContent';
import TileItemsService from '../../services/tileItemsService/TileItemsService';

export default class AddTileDialog extends BaseDialog {
    private _itemUrl: string;
    private _itemName: string;
    private _siteUrl: string;
    private _tileItemsService: TileItemsService;
    private _showError: boolean;
    private _isFolder: boolean;
    private _fileType: string;

    constructor(
      itemName: string, 
      itemUrl: string, 
      siteUrl: string,
      isFolder: boolean,
      fileType: string,
      tileItemsService: TileItemsService) {
        super();
        this._itemName = itemName;
        this._itemUrl = itemUrl;
        this._siteUrl = siteUrl;
        this._tileItemsService = tileItemsService;
        this._isFolder = isFolder;
        this._fileType = fileType;
        this._showError = false;
    }

    private _onAddNewTile(name:string, url:string, icon: string): void {
      this._tileItemsService
        .getJsonAppDataFile()
        .then(appData => {
          if (appData === null) {
            this._showError = true;
          } else {
            let nextItemId = appData.UserTiles.map(item => item.id).sort((a, b) => b-a)[0];
            if (!nextItemId)
              nextItemId = 0;

            appData.UserTiles.push({
              id: nextItemId,
              url,
              value: name,
              iconName: icon
            });

            this._tileItemsService.createOrUpdateJsonDataFile(appData);
            this.close();
          }
        });
    }

    public render(): void {
      const url: string = this._siteUrl + this._itemUrl;
      ReactDOM.render(<AddTileDialogContent
        name={this._itemName}
        url={url}
        showError={this._showError}
        isFolder={this._isFolder}
        isItem={this._fileType === ""}
        fileType={this._fileType}
        close={this.close}
        onAddNewTile={this._onAddNewTile.bind(this)}
        />, this.domElement);
    }
  
    public getConfig(): IDialogConfiguration {
      return {
        isBlocking: false
      };
    }
  }