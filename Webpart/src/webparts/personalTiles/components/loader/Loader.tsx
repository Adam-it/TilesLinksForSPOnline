import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import ILoaderProps from './ILoaderProps';
import ILoaderState from './ILoaderState';
import mainStyles from '../../styles/PersonalTiles.module.scss';

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  public render() {
    return (
      <div className={mainStyles.loader}>
        <Spinner label={strings.Loading} ariaLive='assertive' labelPosition='right' />
      </div>
    );
  }
}
