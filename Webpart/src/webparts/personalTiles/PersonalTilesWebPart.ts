import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalTilesWebPartStrings';
import PersonalTiles from './components/mainLayout/PersonalTiles';
import IPersonalTilesProps from './components/mainLayout/IPersonalTilesProps';
import IPersonalTilesWebPartProps from './IPersonalTilesWebPartProps';

import mockTiles from './mocks/mockTiles';

export default class PersonalTilesWebPart extends BaseClientSideWebPart <IPersonalTilesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalTilesProps> = React.createElement(
      PersonalTiles,
      {
        tiles: mockTiles.getTiles()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: []
        }
      ]
    };
  }
}
