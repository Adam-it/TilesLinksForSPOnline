import * as React from 'react';
import * as strings from 'AddTileApplicationCustomizerApplicationCustomizerStrings';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import dialogStyles from '../../styles/AddTileDialog.module.scss';
import IAddTileDialogProps from './AddTileDialogProps';
import IAddTileDialogState from './AddTileDialogState';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconPicker } from '@pnp/spfx-controls-react/lib/controls/iconPicker';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class AddTileDialog extends React.Component<IAddTileDialogProps, IAddTileDialogState> {

    constructor(props) {
        super(props);
    
        const {
          name,
          url} = this.props;
    
        this.state = {
          name,
          url,
          nameValidation: "",
          urlValidation: "",
          iconName: 'FileASPX'
        };
    }

    private _handleTitleChange(event): void {
        const title = event.target.value;
        
        let validation = "";
        if (title === "")
            validation = strings.DialogNameValidation;
    
        this.setState({
            name: title,
            nameValidation: validation
        });
      }
    
      private _handleUrlChange(event): void {
        const url = event.target.value;
    
        let validation = "";
        if (url === "")
            validation = strings.DialogUrlValidation;
    
        this.setState({
            url: url,
            urlValidation: validation
        });
      }

    private _handleDismiss(): void {
        this.props.onDismiss();
    }

    public render(): JSX.Element {
        const modelProps = { isBlocking: false };
        const dialogContentProps = {
            type: DialogType.normal,
            title: strings.DialogTitle,
            closeButtonAriaLabel: strings.DialogClose,
            subText: strings.DialogText,
            showCloseButton: true
        };
        const textTileNameId: string = "textTileNameId";
        const textTileUrlId: string = "textTileUrlId";
        const {
            name,
            nameValidation,
            url,
            urlValidation,
            iconName } = this.state;
      
          let urlWithoutProtocol = url.replace("www.", "").replace("http://", "").replace("https://", "");

        return (
        <Dialog
            hidden={!this.props.showDialog}
            onDismiss={() => this._handleDismiss()}
            dialogContentProps={dialogContentProps}
            modalProps={modelProps}>
            <div className={dialogStyles.content}>
                <div className={dialogStyles.grid}>
                    <div className={dialogStyles.row}>
                        <div className={dialogStyles.columnFullWidth}>
                            <Label htmlFor={textTileNameId} required>{strings.DialogNameLabel}</Label>
                            <TextField id={textTileNameId} value={name} autoComplete="off" onChange={(e) => this._handleTitleChange(e)}/>
                            <Label className={dialogStyles.errorLabel}>{nameValidation}</Label>
                        </div>
                    </div>
                    <div className={dialogStyles.row}>
                        <div className={dialogStyles.columnFullWidth}>
                            <Label htmlFor={textTileUrlId} required>{strings.DialogUrlLabel}</Label>
                            <TextField id={textTileUrlId} prefix="https://" value={urlWithoutProtocol} autoComplete="off" onChange={(e) => this._handleUrlChange(e)}/>
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
                                onChange={(icon: string) => { this.setState({iconName: icon}); }}
                                onSave={(icon: string) => { this.setState({iconName: icon}); }} />
                        </div>
                        </div>
                    </div>
                    {this.props.showError ?
                        <div className={dialogStyles.row}>
                        <div className={dialogStyles.columnFullWidth}>
                            <MessageBar
                                messageBarType={MessageBarType.error}
                                isMultiline={false}
                                dismissButtonAriaLabel={strings.ErrorMessageClose}>
                                    {strings.ErrorMessage}
                            </MessageBar>
                        </div>
                        </div> :
                    ''}
                </div>
            </div>
            <DialogFooter>
            <PrimaryButton text={strings.DialogSubmitButton} />
            <DefaultButton text={strings.DialogCancelButton} onClick={() => this._handleDismiss()}/>
            </DialogFooter>
        </Dialog>);
    }
}