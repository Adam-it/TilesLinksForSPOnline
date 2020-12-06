import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IAddPanelProps from './IAddPanelProps';
import IAddPanelState from './IAddPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import { Label, TextField, Stack, ActionButton, IIconProps } from 'office-ui-fabric-react';
import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import GlobalSettings from '../../globals/GlobalSettings';

export default class AddPanel extends React.Component<IAddPanelProps, IAddPanelState> {

    constructor(props) {
        super(props);

        this.state = {
            tileName: "",
            tileNameValidation: "",
            tileUrl: "",
            tileUrlValidation: "",
            tileIconName: ""
        };
    } 

    private _cancel(): void {
        this.props.onDismiss();
    }

    private _addTile(): void {
        const {tileName, tileUrl, tileIconName} = this.state;
        
        let panelIsValid: boolean = true;
        let tileNameValidation: string = "";
        if (tileName === "") {
            tileNameValidation = strings.PanelTitleValidation;
            panelIsValid = false;
        }
        let tileUrlValidation: string = "";
        if (tileUrl === "") {
            tileUrlValidation = strings.PanelUrlValidation;
            panelIsValid = false;
        }

        if (panelIsValid){
            this.props.onAddNewTile(
                tileName, 
                `${GlobalSettings.httpsProtocol}${tileUrl.replace("www.", "").replace("http://", "").replace("https://", "")}`,
                tileIconName);
            this.props.onDismiss();
        } else {
            this.setState({
                tileNameValidation,
                tileUrlValidation
            });
        }
    }

    private _handleTitleChange(event): void {
        const title: string = event.target.value;
        
        let validation: string = "";
        if (title === "")
            validation = strings.PanelTitleValidation;

        this.setState({
            tileName: title,
            tileNameValidation: validation
        });
    }

    private _handleUrlChange(event): void {
        const url: string = event.target.value;

        let validation: string = "";
        if (url === "")
            validation = strings.PanelUrlValidation;

        this.setState({
            tileUrl: url,
            tileUrlValidation: validation
        });
    }

    public render() {
        const textTileNameId: string = "textTileNameId";
        const textTileUrlId: string = "textTileUrlId";
        const addIcon: IIconProps = {iconName: 'Add'};
        const cancelIcon: IIconProps = {iconName: 'Cancel'};
        const {
            tileName,
            tileNameValidation,
            tileUrl,
            tileUrlValidation,
            tileIconName} = this.state;

        return(
            <div className={panelStyles.grid}>
                <div className={panelStyles.row}>
                    <div className={panelStyles.columnFullWidth}>
                        <Label className={panelStyles.title}>{strings.AddPanelTitle}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileNameId} required>{strings.AddPanelTileTitle}</Label>
                        <TextField id={textTileNameId} value={tileName} autoComplete="off" onChange={(e) => this._handleTitleChange(e)}/>
                        <Label className={panelStyles.errorLabel}>{tileNameValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileUrlId} required>{strings.AddPanelTileUrl}</Label>
                        <TextField id={textTileUrlId} prefix="https://" value={tileUrl} autoComplete="off" onChange={(e) => this._handleUrlChange(e)}/>
                        <Label className={panelStyles.errorLabel}>{tileUrlValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <div className={panelStyles.iconPicker}>
                            <div className={panelStyles.iconPanel}>
                                <Icon iconName={tileIconName} />
                            </div>
                            <IconPicker buttonLabel={strings.AddPanelSetIcon}
                                renderOption={'dialog'}
                                onChange={(iconName: string) => { this.setState({tileIconName: iconName}); }}
                                onSave={(iconName: string) => { this.setState({tileIconName: iconName}); }} />
                        </div>
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