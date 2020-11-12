import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IAddPanelProps from './IAddPanelProps';
import IAddPanelState from './IAddPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import { Label, TextField, Stack, ActionButton, IIconProps } from 'office-ui-fabric-react';

export default class AddPanel extends React.Component<IAddPanelProps, IAddPanelState> {

    constructor(props) {
        super(props);

        this.state = {
            tileName: "",
            tileUrl: ""
        };
    } 

    private _cancel(): void {
        this.props.onDismiss();
    }

    private _addTile(): void {
        this.props.onAddNewTile(this.state.tileName, this.state.tileUrl);
        this.props.onDismiss();
    }

    private _handleTitleChange(event): void {
        this.setState({tileName: event.target.value});
    }

    private _handleUrlChange(event): void {
        this.setState({tileUrl: event.target.value});
    }

    public render() {
        const textTileNameId: string = "textTileNameId";
        const textTileUrlId: string = "textTileUrlId";
        const addIcon: IIconProps = {iconName: 'Add'};
        const cancelIcon: IIconProps = {iconName: 'Cancel'};
        const {tileName, tileUrl} = this.state;

        return(
            <div className={panelStyles.grid}>
                <div className={panelStyles.row}>
                    <div className={panelStyles.columnFullWidth}>
                        <Label className={panelStyles.title}>{strings.AddPanelTitle}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileNameId} required>{strings.AddPanelTileTitle}</Label>
                        <TextField id={textTileNameId} value={tileName} autoComplete="off" onChange={(e) => this._handleTitleChange(e)}/>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileUrlId} required>{strings.AddPanelTileUrl}</Label>
                        <TextField id={textTileUrlId} prefix="https://" value={tileUrl} autoComplete="off" onChange={(e) => this._handleUrlChange(e)}/>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Stack horizontal className={panelStyles.buttonStack}>
                            <ActionButton iconProps={cancelIcon} onClick={() => this._cancel()}>
                                {strings.AddPanelCancelButton}
                            </ActionButton>
                            <ActionButton iconProps={addIcon} onClick={() => this._addTile()}>
                                {strings.AddPanelSubmitButton}
                            </ActionButton>
                        </Stack>
                    </div>
                </div>
            </div>
        );
    }
}