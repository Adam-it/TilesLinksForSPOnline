import * as React from 'react';
import * as strings from 'AddTileCommandSetCommandSetStrings';
import dialogStyles from '../../styles/Dialog.module.scss';
import IAddTileDialogContentProps from './IAddTileDialogContentProps';
import IAddTileDialogContentState from './IAddTileDialogContentState';
import {
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  DialogContent,
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';
import { Label, TextField } from 'office-ui-fabric-react';

export default class AddTileDialogContent extends React.Component<IAddTileDialogContentProps, IAddTileDialogContentState> {

  constructor(props) {
    super(props);

    const {
      name,
      url} = this.props;

    this.state = {
      name,
      url,
      nameValidation: "",
      urlValidation: ""
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

  private _addTile(): void {
    const {name, url} = this.state;
    
    let panelIsValid: boolean = true;
    let tileNameValidation: string = "";
    if (name === "") {
        tileNameValidation = strings.DialogNameValidation;
        panelIsValid = false;
    }
    let tileUrlValidation: string = "";
    if (url === "") {
        tileUrlValidation = strings.DialogUrlValidation;
        panelIsValid = false;
    }

    if (panelIsValid){
        this.props.onAddNewTile(
            name, 
            `https://${url.replace("www.", "").replace("http://", "").replace("https://", "")}`);
        this.props.close();
    } else {
        this.setState({
            nameValidation: tileNameValidation,
            urlValidation: tileUrlValidation
        });
    }
  }

  public render(): JSX.Element {
    const textTileNameId: string = "textTileNameId";
    const textTileUrlId: string = "textTileUrlId";
    const {
      name,
      nameValidation,
      url,
      urlValidation} = this.state;

    let urlWithoutProtocol = url.replace("www.", "").replace("http://", "").replace("https://", "");

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
        <DefaultButton text={strings.DialogCancelButton} title={strings.DialogCancelButton} onClick={this.props.close} />
        <PrimaryButton text={strings.DialogSubmitButton} title={strings.DialogSubmitButton} onClick={() => this._addTile()}/>
      </DialogFooter>
    </DialogContent>;
  }
}