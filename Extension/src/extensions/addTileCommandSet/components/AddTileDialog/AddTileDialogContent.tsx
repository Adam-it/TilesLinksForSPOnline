import * as React from 'react';
import * as strings from 'AddTileCommandSetCommandSetStrings';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DialogFooter, DialogContent } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconPicker } from '@pnp/spfx-controls-react/lib/IconPicker';
import dialogStyles from '../../styles/Dialog.module.scss';
import IAddTileDialogContentProps from './IAddTileDialogContentProps';
import IAddTileDialogContentState from './IAddTileDialogContentState';
import ProtocolHelper from '../../../helpers/protocolHelper';
import GlobalSettings from '../../../globals/GlobalSettings';

export default class AddTileDialogContent extends React.Component<IAddTileDialogContentProps, IAddTileDialogContentState> {

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
      iconName: this.tryToDefineIconName()
    };
  }

  public render(): JSX.Element {
    const textTileNameId: string = 'textTileNameId';
    const textTileUrlId: string = 'textTileUrlId';
    const {
      name,
      nameValidation,
      url,
      urlValidation,
      iconName } = this.state;

    const urlWithoutProtocol = url.replace(GlobalSettings.httpsProtocol, '');

    return <DialogContent
      title={strings.DialogTitle}
      onDismiss={this.props.close}
      showCloseButton={true}
    >
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
        <PrimaryButton text={strings.DialogSubmitButton} title={strings.DialogSubmitButton} onClick={() => this.addTile()} />
        <DefaultButton text={strings.DialogCancelButton} title={strings.DialogCancelButton} onClick={this.props.close} />
      </DialogFooter>
    </DialogContent>;
  }

  private tryToDefineIconName(): string {
    const {
      isFolder,
      isItem,
      fileType } = this.props;

    if (isFolder) {
      return 'FabricFolder';
    }

    if (isItem) {
      return 'QuickNote';
    }

    switch (fileType.toLowerCase()) {
      case 'docx':
        return 'WordDocument';
      case 'doc':
        return 'WordDocument';
      case 'xlsx':
        return 'ExcelDocument';
      case 'xls':
        return 'ExcelDocument';
      case 'xlsm':
        return 'ExcelDocument';
      case 'pptx':
        return 'PowerPointDocument';
      case 'ppt':
        return 'PowerPointDocument';
      case 'pdf':
        return 'PDF';
      default:
        return 'TextDocument';
    }
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
      this.props.close();
    } else {
      this.setState({
        nameValidation: tileNameValidation,
        urlValidation: tileUrlValidation
      });
    }
  }
}