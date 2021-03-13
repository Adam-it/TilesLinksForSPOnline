import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import AddTileButton from './components/AddTileButton/AddTileButton';
import IAddTileButtonProps from './components/AddTileButton/IAddTileButtonProps';
import IAddTileApplicationCustomizerApplicationCustomizerProperties from './IAddTileApplicationCustomizerApplicationCustomizerProperties';


export default class AddTileApplicationCustomizerApplicationCustomizer extends BaseApplicationCustomizer<IAddTileApplicationCustomizerApplicationCustomizerProperties> {
  private topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    if (!this.topPlaceholder) {
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, null);

      if (!this.topPlaceholder) {
        return;
      }

      if (this.properties) {
        if (this.topPlaceholder.domElement) {
          const addTileButton: React.ReactElement<IAddTileButtonProps> = React.createElement(AddTileButton, {
            name: document.title,
            url: window.location.href,
            context: this.context
          });
          ReactDOM.render(addTileButton, this.topPlaceholder.domElement);
        }
      }
    }
  }
}
