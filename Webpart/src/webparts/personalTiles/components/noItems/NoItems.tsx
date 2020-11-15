import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import INoItemsProps from './INoItemsProps';
import INoItemsState from './INoItemsState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class NoItems extends React.Component<INoItemsProps, INoItemsState> {
  public render() {
    return (
      <div className={mainStyles.panel}>
            <div>
                <Icon  iconName={"Sad"}/>
            </div>
            <div>
                <label>{strings.NoItemsText}</label>
            </div>
      </div>
    );
  }
}
