import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { 
  BaseApplicationCustomizer, 
  PlaceholderContent, 
  PlaceholderName } from '@microsoft/sp-application-base';
import AddTileButton from './components/AddTileButton/AddTileButton';
import IAddTileButtonProps from './components/AddTileButton/IAddTileButtonProps';
import IAddTileApplicationCustomizerApplicationCustomizerProperties from './IAddTileApplicationCustomizerApplicationCustomizerProperties';


export default class AddTileApplicationCustomizerApplicationCustomizer extends BaseApplicationCustomizer<IAddTileApplicationCustomizerApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, null);
  
      if (!this._topPlaceholder)
        return;
  
      if (this.properties) {  
        if (this._topPlaceholder.domElement) {
          const addTileButton: React.ReactElement<IAddTileButtonProps> = React.createElement(AddTileButton);  
          ReactDOM.render(addTileButton, this._topPlaceholder.domElement);   
        }
      }
    }
  }
}
