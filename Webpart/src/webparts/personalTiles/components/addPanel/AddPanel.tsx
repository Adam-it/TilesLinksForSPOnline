import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import { Label, TextField, Stack, ActionButton, IIconProps } from 'office-ui-fabric-react';
import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import IAddPanelProps from './IAddPanelProps';
import IAddPanelState from './IAddPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import GlobalSettings from '../../globals/GlobalSettings';
import ProtocolHelper from '../../helpers/protocolHelper';

export default class AddPanel extends React.Component<IAddPanelProps, IAddPanelState> {

    constructor(props: IAddPanelProps) {
        super(props);

        this.state = {
            tileName: '',
            tileNameValidation: '',
            tileUrl: '',
            tileUrlValidation: '',
            tileIconName: ''
        };
    }

    public render() {
        const textTileNameId: string = 'textTileNameId';
        const textTileUrlId: string = 'textTileUrlId';
        const addIcon: IIconProps = { iconName: 'Add' };
        const cancelIcon: IIconProps = { iconName: 'Cancel' };
        const {
            tileName,
            tileNameValidation,
            tileUrl,
            tileUrlValidation,
            tileIconName } = this.state;

        const { predefinedLinks } = this.props;

        return (
            <div className={panelStyles.grid}>
                <div className={panelStyles.row}>
                    <div className={panelStyles.columnFullWidth}>
                        <Label className={panelStyles.title}>{strings.AddPanelTitle}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileNameId} required>{strings.AddPanelTileTitle}</Label>
                        <TextField id={textTileNameId} value={tileName} autoComplete='off' onChange={(e) => this.handleTitleChange(e)} />
                        <Label className={panelStyles.errorLabel}>{tileNameValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Label htmlFor={textTileUrlId} required>{strings.AddPanelTileUrl}</Label>
                        <TextField id={textTileUrlId} prefix={GlobalSettings.httpsProtocol} value={tileUrl} autoComplete='off' onChange={(e) => this.handleUrlChange(e)} />
                        <Label className={panelStyles.errorLabel}>{tileUrlValidation}</Label>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <div className={panelStyles.iconPicker}>
                            <div className={panelStyles.iconPanel}>
                                <Icon iconName={tileIconName} />
                            </div>
                            <IconPicker buttonLabel={strings.AddPanelSetIcon}
                                renderOption={'dialog'}
                                onChange={(iconName: string) => { this.setState({ tileIconName: iconName }); }}
                                onSave={(iconName: string) => { this.setState({ tileIconName: iconName }); }} />
                        </div>
                    </div>
                    <div className={panelStyles.columnFullWidth}>
                        <Stack horizontal className={panelStyles.buttonStack}>
                            <ActionButton iconProps={addIcon} onClick={() => this.addTile()}>
                                {strings.AddPanelSubmitButton}
                            </ActionButton>
                            <ActionButton iconProps={cancelIcon} onClick={() => this.cancel()}>
                                {strings.AddPanelCancelButton}
                            </ActionButton>
                        </Stack>
                    </div>
                    {
                        predefinedLinks.length !== 0 ?
                            <div className={panelStyles.columnFullWidth}>
                                <div className={panelStyles.predefinedLinksPanel}>
                                    <Label>{strings.AddPanelPredefinedLinksTitle}</Label>
                                    {predefinedLinks.map(item => {
                                        return (
                                            <div className={panelStyles.predefinedLink}>
                                                <ActionButton iconProps={addIcon} onClick={() => this.addPredefinedLinkTile(item.value, item.url, item.iconName)}></ActionButton>
                                                <a href={item.url}>{item.value}</a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div> : ''
                    }
                </div>
            </div>
        );
    }

    private cancel(): void {
        this.props.onDismiss();
    }

    private addPredefinedLinkTile(tileName: string, tileUrl: string, tileIconName: string): void{
        this.props.onAddNewTile(
            tileName,
            tileUrl,
            tileIconName);
        this.props.onDismiss();
    }

    private addTile(): void {
        const { tileName, tileUrl, tileIconName } = this.state;

        let panelIsValid: boolean = true;
        let tileNameValidation: string = '';
        if (tileName === '') {
            tileNameValidation = strings.PanelTitleValidation;
            panelIsValid = false;
        }
        let tileUrlValidation: string = '';
        if (tileUrl === '') {
            tileUrlValidation = strings.PanelUrlValidation;
            panelIsValid = false;
        }

        if (panelIsValid) {
            this.props.onAddNewTile(
                tileName,
                ProtocolHelper.changeToHtppsProtocol(tileUrl),
                tileIconName);
            this.props.onDismiss();
        } else {
            this.setState({
                tileNameValidation,
                tileUrlValidation
            });
        }
    }

    private handleTitleChange(event: any): void {
        const title: string = event.target.value;

        this.setState({
            tileName: title,
            tileNameValidation: title === '' ? strings.PanelTitleValidation : ''
        });
    }

    private handleUrlChange(event: any): void {
        const url: string = event.target.value;

        this.setState({
            tileUrl: url,
            tileUrlValidation: url === '' ? strings.PanelUrlValidation : ''
        });
    }
}
