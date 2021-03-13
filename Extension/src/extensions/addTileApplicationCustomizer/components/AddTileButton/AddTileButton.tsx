import * as React from 'react';
import * as strings from 'AddTileApplicationCustomizerApplicationCustomizerStrings';
import addTileButtonStyles from '../../styles/AddTileButton.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import IAddTileButtonProps from './IAddTileButtonProps';
import IAddTileButtonState from './IAddTileButtonState';
import AddTileDialog from '../AddTileDialog/AddTileDialog';
import TileItemsService from '../../../services/tileItemsService/TileItemsService';
import { MSGraphClient } from '@microsoft/sp-http';
import ITileItemsServiceInput from '../../../model/tileItemsService/ITileItemsServiceInput';

export default class AddTileButton extends React.Component<IAddTileButtonProps, IAddTileButtonState> {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            tileItemsService: null,
            showError: false
        };

        this.props.context.msGraphClientFactory
            .getClient()
            .then((client: MSGraphClient): void => {
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

    private _handleAddTileClick(): void {
        this.setState({
            showDialog: true
        });
    }

    private _handleDialogDismiss(): void {
        this.setState({
            showDialog: false
        });
    }

    private _handleAddTile(name: string, url: string, icon: string): void {
        this.state.tileItemsService
            .getJsonAppDataFile()
            .then(appData => {
                if (appData === null) {
                    this.setState({ showError: true });
                } else {
                    let nextItemId = appData.UserTiles.map(item => item.id).sort((a, b) => b - a)[0];
                    if (!nextItemId) {
                        nextItemId = 0;
                    }
                    nextItemId = nextItemId + 1;
                    appData.UserTiles.push({
                        id: nextItemId,
                        url,
                        value: name,
                        iconName: icon
                    });

                    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
                    this._handleDialogDismiss();
                }
            });
    }

    public render(): JSX.Element {
        const {
            name,
            url } = this.props;

        return (
            <div className={addTileButtonStyles.content}>
                <div className={addTileButtonStyles.grid}>
                    <div className={addTileButtonStyles.row}>
                        <div className={addTileButtonStyles.columnFullWidth}>
                            <PrimaryButton onClick={() => this._handleAddTileClick()}>{strings.ButtonTitle}</PrimaryButton>
                        </div>
                    </div>
                </div>
                <AddTileDialog
                    showDialog={this.state.showDialog}
                    onDismiss={this._handleDialogDismiss.bind(this)}
                    name={name}
                    url={url}
                    showError={this.state.showError}
                    onAddNewTile={this._handleAddTile.bind(this)} />
            </div>);
    }
}