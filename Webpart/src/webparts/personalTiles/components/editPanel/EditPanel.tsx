import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IEditPanelProps from './IEditPanelProps';
import IEditPanelState from './IEditPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import { Label, TextField, Stack, ActionButton, IIconProps } from 'office-ui-fabric-react';

export default class EditPanel extends React.Component<IEditPanelProps, IEditPanelState> {

    constructor(props) {
        super(props);

        let tile = this.props.tile;

        this.state = {
            tileId: tile.id,
            tileName: tile.value,
            tileUrl: tile.url
        };
    }

    private _cancel() {
        this.props.onDismiss();
    }

    private _delete(){
        this.props.onRemove(this.state.tileId);
        this.props.onDismiss();
    }

    private _edit(){
        const {tileId, tileName, tileUrl} = this.state;
        this.props.onEdit(tileId, tileName, tileUrl);
        this.props.onDismiss();
    }

    private _handleTitleChange(event) {
        this.setState({tileName: event.target.value});
    }

    private _handleUrlChange(event) {
        this.setState({tileUrl: event.target.value});
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
        const {tileName, tileUrl} = this.state;

        return(
            <div className={panelStyles.grid}>
                <div className={panelStyles.row}>
                    <div className={panelStyles.columnFullWidth}>
                        <Label className={panelStyles.title}>{strings.EditPanelTitle}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileNameId} required>{strings.EditPanelTileTitle}</Label>
                        <TextField id={textTileNameId} value={tileName} autoComplete="off" onChange={(e) => this._handleTitleChange(e)}/>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileUrlId} required>{strings.EditPanelTileUrl}</Label>
                        <TextField id={textTileUrlId} prefix="https://" value={tileUrl} autoComplete="off" onChange={(e) => this._handleUrlChange(e)}/>
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