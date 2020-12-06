import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IEditPanelProps from './IEditPanelProps';
import IEditPanelState from './IEditPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import { Label, TextField, Stack, ActionButton, IIconProps } from 'office-ui-fabric-react';
import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import GlobalSettings from '../../globals/GlobalSettings';

export default class EditPanel extends React.Component<IEditPanelProps, IEditPanelState> {

    constructor(props) {
        super(props);

        let tile = this.props.tile;

        this.state = {
            tileId: tile.id,
            tileName: tile.value,
            tileUrl: tile.url.replace(GlobalSettings.httpsProtocol, ""),
            tileNameValidation: "",
            tileUrlValidation: "",
            tileIconName: tile.iconName
        };
    }

    private _cancel(): void {
        this.props.onDismiss();
    }

    private _delete(): void {
        this.props.onRemove(this.state.tileId);
        this.props.onDismiss();
    }

    private _edit(): void {
        const {tileId, tileName, tileUrl, tileIconName} = this.state;

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
            this.props.onEdit(
                tileId, 
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
        const title = event.target.value;
        
        let validation = "";
        if (title === "")
            validation = strings.PanelTitleValidation;

        this.setState({
            tileName: title,
            tileNameValidation: validation
        });
    }

    private _handleUrlChange(event): void {
        const url = event.target.value;

        let validation = "";
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
        const cancelIcon: IIconProps = {iconName: 'Cancel'};
        const editIcon: IIconProps = {iconName: 'Edit'};
        const deleteButtonStyle = {
            root: { color: "red" },
            rootHovered: {
              color: "darkRed",
              selectors: {
                ":hover": {
                  selectors: {
                    ".ms-Button-icon": { color: "darkRed" }
                  }
                }
              }
            }
        };
        const deleteIcon: IIconProps = {
            iconName: 'Delete',
            styles: deleteButtonStyle
            };
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
                        <Label className={panelStyles.title}>{strings.EditPanelTitle}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileNameId} required>{strings.EditPanelTileTitle}</Label>
                        <TextField id={textTileNameId} value={tileName} autoComplete="off" onChange={(e) => this._handleTitleChange(e)}/>
                        <Label className={panelStyles.errorLabel}>{tileNameValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileUrlId} required>{strings.EditPanelTileUrl}</Label>
                        <TextField id={textTileUrlId} prefix="https://" value={tileUrl} autoComplete="off" onChange={(e) => this._handleUrlChange(e)}/>
                        <Label className={panelStyles.errorLabel}>{tileUrlValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <div className={panelStyles.iconPicker}>
                            <div className={panelStyles.iconPanel}>
                                <Icon iconName={tileIconName} />
                            </div>
                            <IconPicker buttonLabel={strings.EditPanelSetIcon}
                                renderOption={'dialog'}
                                onChange={(iconName: string) => { this.setState({tileIconName: iconName}); }}
                                onSave={(iconName: string) => { this.setState({tileIconName: iconName}); }} />
                        </div>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Stack horizontal className={panelStyles.buttonStack}>
                            <ActionButton iconProps={cancelIcon} onClick={() => this._cancel()}>
                                {strings.EditPanelCancelButton}
                            </ActionButton>
                            <ActionButton iconProps={editIcon} onClick={() => this._edit()}>
                                {strings.EditPanelSubmitEditButton}
                            </ActionButton>
                            <ActionButton iconProps={deleteIcon} styles={deleteButtonStyle}  onClick={() => this._delete()}>
                                {strings.EditPanelDeleteButton}
                            </ActionButton>
                        </Stack>
                    </div>
                </div>
            </div>
        );
    }
}