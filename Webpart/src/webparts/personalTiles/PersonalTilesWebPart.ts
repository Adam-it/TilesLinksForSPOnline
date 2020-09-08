import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalTilesWebPartStrings';
import PersonalTiles from './components/MainLayout/PersonalTiles';
import IPersonalTilesProps from './components/MainLayout/IPersonalTilesProps';
import IPersonalTilesWebPartProps from './IPersonalTilesWebPartProps';

export default class PersonalTilesWebPart extends BaseClientSideWebPart <IPersonalTilesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalTilesProps> = React.createElement(
      PersonalTiles,
      {}
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
