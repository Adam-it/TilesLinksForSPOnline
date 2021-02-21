import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import AddTileDialogContent from './AddTileDialogContent';

export default class AddTileDialog extends BaseDialog {
    private _itemUrl: string;
    private _itemName: string;
    private _siteUrl: string;

    constructor(itemName: string, itemUrl: string, siteUrl: string) {
        super();
        this._itemName = itemName;
        this._itemUrl = itemUrl;
        this._siteUrl = siteUrl;
    }

    private _onAddNewTile(name:string, url:string, icon: string): void {
      console.log(name, url, icon);
    }

    public render(): void {
      const url: string = this._siteUrl + this._itemUrl;
      ReactDOM.render(<AddTileDialogContent
        name={this._itemName}
        url={url}
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