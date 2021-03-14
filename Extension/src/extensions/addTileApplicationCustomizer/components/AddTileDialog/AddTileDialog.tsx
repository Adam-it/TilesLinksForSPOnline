import * as React from 'react';
import * as strings from 'AddTileApplicationCustomizerApplicationCustomizerStrings';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconPicker } from '@pnp/spfx-controls-react/lib/controls/iconPicker';
import GlobalSettings from '../../../globals/GlobalSettings';
import ProtocolHelper from '../../../helpers/protocolHelper';
import dialogStyles from '../../styles/AddTileDialog.module.scss';
import IAddTileDialogProps from './AddTileDialogProps';
import IAddTileDialogState from './AddTileDialogState';

export default class AddTileDialog extends React.Component<IAddTileDialogProps, IAddTileDialogState> {

    constructor(props) {
        super(props);

        const {
            name,
            url } = this.props;

        this.state = {
            name,
            url,
            nameValidation: '',
            urlValidation: '',
            iconName: GlobalSettings.iconFileASPX
        };
    }

    public render(): JSX.Element {
        const modalProps = { isBlocking: false };
        const dialogContentProps = {
            type: DialogType.normal,
            title: strings.DialogTitle,
            closeButtonAriaLabel: strings.DialogClose,
            subText: strings.DialogText,
            showCloseButton: true
        };
        const textTileNameId: string = 'textTileNameId';
        const textTileUrlId: string = 'textTileUrlId';
        const {
            name,
            nameValidation,
            url,
            urlValidation,
            iconName } = this.state;

        const urlWithoutProtocol = url.replace(GlobalSettings.httpsProtocol, '');

        return (
            <Dialog
                hidden={!this.props.showDialog}
                onDismiss={() => this.handleDismiss()}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}>
                <div className={dialogStyles.content}>
                    <div className={dialogStyles.grid}>
                        <div className={dialogStyles.row}>
                            <div className={dialogStyles.columnFullWidth}>
                                <Label htmlFor={textTileNameId} required>{strings.DialogNameLabel}</Label>
                                <TextField id={textTileNameId} value={name} autoComplete='off' onChange={(e) => this.handleTitleChange(e)} />
                                <Label className={dialogStyles.errorLabel}>{nameValidation}</Label>
                            </div>
                        </div>
                        <div className={dialogStyles.row}>
                            <div className={dialogStyles.columnFullWidth}>
                                <Label htmlFor={textTileUrlId} required>{strings.DialogUrlLabel}</Label>
                                <TextField id={textTileUrlId} prefix={GlobalSettings.httpsProtocol} value={urlWithoutProtocol} autoComplete='off' onChange={(e) => this.handleUrlChange(e)} />
                                <Label className={dialogStyles.errorLabel}>{urlValidation}</Label>
                            </div>
                        </div>
                        <div className={dialogStyles.row}>
                            <div className={dialogStyles.columnFullWidth}>
                                <div className={dialogStyles.iconPicker}>
                                    <div className={dialogStyles.iconPanel}>
                                        <Icon iconName={iconName} />
                                    </div>
                                    <IconPicker buttonLabel={strings.DialogSetIcon}
                                        renderOption={'dialog'}
                                        onChange={(icon: string) => { this.setState({ iconName: icon }); }}
                                        onSave={(icon: string) => { this.setState({ iconName: icon }); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <PrimaryButton text={strings.DialogSubmitButton} onClick={() => this.addTile()} />
                    <DefaultButton text={strings.DialogCancelButton} onClick={() => this.handleDismiss()} />
                </DialogFooter>
            </Dialog>);
    }

    private handleTitleChange(event): void {
        const title = event.target.value;

        this.setState({
            name: title,
            nameValidation: title === '' ? strings.DialogNameValidation : ''
        });
    }

    private handleUrlChange(event): void {
        const url = event.target.value;

        this.setState({
            url: url,
            urlValidation: url === '' ? strings.DialogUrlValidation : ''
        });
    }

    private handleDismiss(): void {
        this.props.onDismiss();
    }

    private addTile(): void {
        const {
            name,
            url,
            iconName } = this.state;

        let panelIsValid: boolean = true;
        let tileNameValidation: string = '';
        if (name === '') {
            tileNameValidation = strings.DialogNameValidation;
            panelIsValid = false;
        }
        let tileUrlValidation: string = '';
        if (url === '') {
            tileUrlValidation = strings.DialogUrlValidation;
            panelIsValid = false;
        }

        if (panelIsValid) {
            this.props.onAddNewTile(
                name,
                ProtocolHelper.changeToHtppsProtocol(url),
                iconName);
            this.props.onDismiss();
        } else {
            this.setState({
                nameValidation: tileNameValidation,
                urlValidation: tileUrlValidation
            });
        }
    }
}