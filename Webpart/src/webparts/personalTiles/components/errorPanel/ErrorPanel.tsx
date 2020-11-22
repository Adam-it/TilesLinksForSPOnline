import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IErrorPanelProps from './IErrorPanelProps';
import IErrorPanelState from './IErrorPanelState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export default class ErrorPanel extends React.Component<IErrorPanelProps, IErrorPanelState> {
  
  private _refresh(): void {
    window.location.reload();
  }
  
  public render() {
    const {errorDescription} = this.props;
    return (
      <div className={mainStyles.panel}>
            <div>
                <Icon iconName={"BugSolid"}/>
            </div>
            <div>
                <label>{strings.ErrorText}</label>
            </div>
            <div className={mainStyles.refreshButtonRow}>
              <PrimaryButton onClick={() => this._refresh()}>
                {strings.ErrorPanelRefresh}
              </PrimaryButton>
            </div>
            <div className={mainStyles.console}>
              <p>{errorDescription}</p>
            </div>
      </div>
    );
  }
}
