import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import ILoaderProps from './ILoaderProps';
import ILoaderState from './ILoaderState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  public render() {
    return (
      <div className={mainStyles.loader}>
        <Spinner label={strings.Loading} ariaLive="assertive" labelPosition="right" />
      </div>
    );
  }
}
