import * as React from 'react';
import * as strings from 'AddTileApplicationCustomizerApplicationCustomizerStrings';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import addTileButtonStyles from '../../styles/AddTileButton.module.scss';
import TileItemsService from '../../../services/tileItemsService/TileItemsService';
import ITileItemsServiceInput from '../../../model/tileItemsService/ITileItemsServiceInput';
import IAddTileButtonProps from './IAddTileButtonProps';
import IAddTileButtonState from './IAddTileButtonState';
import AddTileDialog from '../AddTileDialog/AddTileDialog';

export default class AddTileButton extends React.Component<IAddTileButtonProps, IAddTileButtonState> {

    constructor(props: IAddTileButtonProps) {
        super(props);

        this.state = {
            showDialog: false,
            tileItemsService: null,
            showError: false
        };

        this.props.context.msGraphClientFactory
          .getClient('3')
          .then((client: MSGraphClientV3): void => {
                const input: ITileItemsServiceInput = {
                    httpClient: this.props.context.httpClient,
                    mSGraphClient: client
                };

                const tileItemsService: TileItemsService = new TileItemsService(input);

                this.setState({ tileItemsService });

                tileItemsService
                    .checkIfAppDataFolderExists()
                    .then(appDataFolderExists => {
                        if (!appDataFolderExists) {
                            tileItemsService.createAppDataFolder();
                        }
                    });
            });
    }

    public render(): JSX.Element {
        const {
            name,
            url } = this.props;
        const modalProps = { isBlocking: false };
        const dialogContentProps = {
            type: DialogType.close,
            title: strings.DialogTitle,
            closeButtonAriaLabel: strings.DialogClose,
            showCloseButton: true
        };

        return (
            <div className={addTileButtonStyles.content}>
                <div className={addTileButtonStyles.grid}>
                    <div className={addTileButtonStyles.row}>
                        <div className={addTileButtonStyles.columnFullWidth}>
                            <PrimaryButton onClick={() => this.handleAddTileClick()}>{strings.ButtonTitle}</PrimaryButton>
                        </div>
                    </div>
                </div>
                <AddTileDialog
                    showDialog={this.state.showDialog}
                    onDismiss={this.handleDialogDismiss.bind(this)}
                    name={name}
                    url={url}
                    onAddNewTile={this.handleAddTile.bind(this)} />
                {this.state.showError ?
                    <Dialog
                        hidden={false}
                        onDismiss={() => this.handleErrorDialogDismiss()}
                        modalProps={modalProps}
                        dialogContentProps={dialogContentProps}>
                        {strings.ErrorMessage}
                        <DialogFooter>
                            <DefaultButton text={strings.ErrorMessageClose} onClick={() => this.handleErrorDialogDismiss()} />
                        </DialogFooter>
                    </Dialog> :
                    ''}
            </div>);
    }

    private handleErrorDialogDismiss(): void {
        this.setState({ showError: false });
    }

    private handleAddTileClick(): void {
        this.setState({
            showDialog: true
        });
    }

    private handleDialogDismiss(): void {
        this.setState({
            showDialog: false
        });
    }

    private handleAddTile(name: string, url: string, icon: string): void {
        this.state.tileItemsService
            .getJsonAppDataFile()
            .then(appData => {
                if (appData === null) {
                    this.setState({ showError: true });
                } else {
                    let nextItemId = appData.userTiles.map(item => item.id).sort((a, b) => b - a)[0];
                    if (!nextItemId) {
                        nextItemId = 0;
                    }
                    nextItemId = nextItemId + 1;
                    appData.userTiles.push({
                        id: nextItemId,
                        url,
                        value: name,
                        iconName: icon
                    });

                    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
                    this.handleDialogDismiss();
                }
            });
    }
}
