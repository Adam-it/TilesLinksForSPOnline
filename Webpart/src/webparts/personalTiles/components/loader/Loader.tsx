import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import ILoaderProps from './ILoaderProps';
import ILoaderState from './ILoaderState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  public render() {
    return (
      <div className={mainStyles.loader}>
          <label><Icon iconName={"ProgressRingDots"} /> {strings.Loading}</label>
      </div>
    );
  }
}
