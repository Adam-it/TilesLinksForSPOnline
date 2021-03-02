import * as React from 'react';
import * as strings from 'AddTileApplicationCustomizerApplicationCustomizerStrings';
import addTileButtonStyles from '../../styles/AddTileButton.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import IAddTileButtonProps from './IAddTileButtonProps';
import IAddTileButtonState from './IAddTileButtonState';
import AddTileDialog from '../AddTileDialog/AddTileDialog';

export default class AddTileButton extends React.Component<IAddTileButtonProps, IAddTileButtonState> {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false
        };
    }

    private _handleAddTileClick(): void {
        this.setState({
            showDialog: true
        });
    }

    private _handleDialogDismiss(): void {
        this.setState({
            showDialog: false
        });
    }

    public render(): JSX.Element {
        return (
        <div className={addTileButtonStyles.content}>
            <div className={addTileButtonStyles.grid}>
                <div className={addTileButtonStyles.row}>
                    <div className={addTileButtonStyles.columnFullWidth}>
                        <PrimaryButton onClick={() => this._handleAddTileClick()}>{strings.ButtonTitle}</PrimaryButton>
                    </div>
                </div>
            </div>
            <AddTileDialog 
                showDialog={this.state.showDialog} 
                onDismiss={this._handleDialogDismiss.bind(this)}
                name=""
                url=""
                showError={false}/>
        </div>);
    }
}