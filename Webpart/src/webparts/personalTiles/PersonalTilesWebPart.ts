import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PersonalTilesWebPartStrings';
import PersonalTiles from './components/mainLayout/PersonalTiles';
import IPersonalTilesProps from './components/mainLayout/IPersonalTilesProps';
import IPersonalTilesWebPartProps from './IPersonalTilesWebPartProps';

export default class PersonalTilesWebPart extends BaseClientSideWebPart <IPersonalTilesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonalTilesProps> = React.createElement(
      PersonalTiles,
      {
        webpartLabelConfig: {
          webpartTitle: this.properties.personalTilesWebpartTitle,
          webpartInfo: this.properties.personalTilesWebpartDescription
        },
        context: this.context
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
          groups: [
            {
              groupName: strings.PropertyPaneGeneralGroupName,
              groupFields: [
                PropertyPaneTextField('personalTilesWebpartTitle', {
                  label: strings.PropertyPaneTitleField
                }),
                PropertyPaneTextField('personalTilesWebpartDescription', {
                  label: strings.PropertyPaneInfoField,
                  multiline: true,
                  rows: 5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
