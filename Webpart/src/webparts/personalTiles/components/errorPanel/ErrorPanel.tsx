import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import IErrorPanelProps from './IErrorPanelProps';
import IErrorPanelState from './IErrorPanelState';
import mainStyles from '../../styles/PersonalTiles.module.scss';

export default class ErrorPanel extends React.Component<IErrorPanelProps, IErrorPanelState> {

  public render() {
    const { errorDescription } = this.props;
    return (
      <div className={mainStyles.panel}>
        <div>
          <Icon iconName={'BugSolid'} />
        </div>
        <div>
          <label>{strings.ErrorText}</label>
        </div>
        <div className={mainStyles.refreshButtonRow}>
          <PrimaryButton onClick={() => this.refresh()}>
            {strings.ErrorPanelRefresh}
          </PrimaryButton>
        </div>
        <div className={mainStyles.console}>
          <p>{errorDescription}</p>
        </div>
      </div>
    );
  }

  private refresh(): void {
    window.location.reload();
  }
}
