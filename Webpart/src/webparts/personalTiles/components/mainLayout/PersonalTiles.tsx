import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import { arrayMove } from 'react-sortable-hoc';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { PanelPosition } from '../../model/enums/PanelPosition';
import { PanelType } from '../../model/enums/PanelType';
import { Label } from 'office-ui-fabric-react/lib/Label';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import sortableStyles from '../../styles/Sortable.module.scss';
import SortableList from '../sortableList/SortableList';
import Loader from '../loader/Loader';
import NoItems from '../noItems/NoItems';
import ErrorPanel from '../errorPanel/ErrorPanel';
import ToolBar from '../toolbar/ToolBar';
import Panel from '../panelLayout/Panel';
import AddPanel from '../addPanel/AddPanel';
import EditPanel from '../editPanel/EditPanel';
import ITileItem from '../../model/ITileItem';
import IAppData from '../../model/IAppData';
import TileItemsService from '../../services/tileItemsService/TileItemsService';
import ITileItemsServiceInput from '../../model/tileItemsService/ITileItemsServiceInput';
import GlobalSettings from '../../globals/GlobalSettings';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {

  constructor(props : IPersonalTilesProps) {
    super(props);

    const items = new Array();
    const itemToEdit: ITileItem = null;
    const sortingIsActive: boolean = false;
    const isLoading: boolean = true;
    const isEmpty: boolean = false;
    const sidePanelOpen: boolean = false;
    const panelType: PanelType = PanelType.Add;
    const tileItemsService: TileItemsService = null;
    const isError: boolean = false;
    const errorDescription: string = '';
    const predefinedLinks: ITileItem[] = null;

    this.state = {
      items,
      itemToEdit,
      sortingIsActive,
      isLoading,
      isEmpty,
      sidePanelOpen,
      panelType,
      tileItemsService,
      predefinedLinks,
      isError,
      errorDescription
    };
  }

  public componentDidMount(): void {
    this.props.context.msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3): void => {
        const input: ITileItemsServiceInput = {
          httpClient: this.props.context.httpClient,
          mSGraphClient: client,
          spHttpClient: this.props.context.spHttpClient
        };

        this.setState({ tileItemsService: new TileItemsService(input) });

        try {
          this.state.tileItemsService
            .checkIfAppDataFolderExists()
            .then(appDataFolderExists => {
              if (appDataFolderExists.isError) {
                this.setState({
                  isError: true,
                  errorDescription: appDataFolderExists.errorMessage
                });
              } else if (!appDataFolderExists.folderExists) {
                this.state.tileItemsService
                  .createAppDataFolder()
                  .then(folderName => {
                    if (folderName === null) {
                      this.setState({
                        isError: true,
                        errorDescription: strings.ErrorCouldNotGetData
                      });
                    } else {
                      this.LoadData();
                    }
                  });
              } else {
                this.LoadData();
              }
            });
        } catch (exception) {
          this.setState({
            isError: true,
            errorDescription: strings.ErrorCouldNotGetData
          });
        }
      });
  }

  public render() {
    const {
      items,
      sortingIsActive,
      isLoading,
      isEmpty,
      sidePanelOpen,
      panelType,
      itemToEdit,
      predefinedLinks,
      isError,
      errorDescription } = this.state;

    const {
      webpartTitle,
      webpartInfo } = this.props.webpartLabelConfig;

    return (
      <div className={mainStyles.personalTiles}>
        <div className={mainStyles.grid}>
          <div className={mainStyles.row}>
            <div className={mainStyles.columnFullWidth}>
              <Label className={mainStyles.title}>{webpartTitle}</Label>
            </div>
          </div>
          <div className={mainStyles.row}>
            <div className={mainStyles.columnFullWidth}>
              <ToolBar addHandel={() => this.addTileHandle()} infoText={webpartInfo} />
            </div>
          </div>
          <div className={mainStyles.row}>
            <div className={mainStyles.columnFullWidth}>
              <div className={!isLoading || isError ? mainStyles.hide : null}>
                <Loader />
              </div>
              <div className={!isError ? mainStyles.hide : null}>
                <ErrorPanel errorDescription={errorDescription} />
              </div>
              <div className={isError ? mainStyles.hide : null}>
                <div className={!isEmpty ? mainStyles.hide : null}>
                  <NoItems />
                </div>
                <div className={sortingIsActive ? sortableStyles.isSortingActive : null} >
                  <SortableList
                    items={items}
                    axis='xy'
                    helperClass={sortableStyles.sortableItemDragging}
                    onSortEnd={this.onSortEnd}
                    onSortStart={this.onSortStart}
                    useDragHandle={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Panel isOpen={sidePanelOpen} position={PanelPosition.Right} onDismiss={this.onPanelClosed.bind(this)}>
          {panelType === PanelType.Add ?
            <AddPanel onDismiss={() => this.onPanelClosed()} onAddNewTile={this.onAddNewTile.bind(this)} iconPickerRenderOption={'dialog'} predefinedLinks={predefinedLinks}/> :
            <EditPanel tile={itemToEdit} onDismiss={() => this.onPanelClosed()} onRemove={this.onRemoveTile.bind(this)} onEdit={this.onEditTitle.bind(this)} iconPickerRenderOption={'dialog'} />}
        </Panel>
      </div>
    );
  }

  private LoadData(): void {
    this.state.tileItemsService
      .getJsonAppDataFile()
      .then(appData => {
        if (appData === null) {
          this.setState({
            isError: true,
            errorDescription: strings.ErrorCouldNotGetData
          });
        } else {
          this.setState({
            items: appData.userTiles.map((item) => {
              return {
                item,
                editTileClick: this.editTileHandle
              };
            }),
            isLoading: false,
            isEmpty: appData.userTiles.length === 0
          });
        }
      });
  }

  private onSortEnd = ({ oldIndex, newIndex }: any): void => {
    const prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
      sortingIsActive: false
    });

    const appData: IAppData = { userTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private onSortStart = (): void => {
    this.setState({ sortingIsActive: true });
  }

  private onPanelClosed(): void {
    this.setState({ sidePanelOpen: false });
  }

  private onAddNewTile(name: string, url: string, icon: string): void {
    const items = this.state.items;

    let nextItemId = items.map(item => item.item.id).sort((a, b) => b - a)[0];
    if (!nextItemId) {
      nextItemId = 0;
    }

    items.push({
      item: {
        id: nextItemId + 1,
        value: name,
        url: url,
        iconName: icon
      },
      editTileClick: this.editTileHandle
    });
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    const appData: IAppData = { userTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private onRemoveTile(id: number): void {
    let items = this.state.items;
    items = items.filter(x => {
      return x.item.id != id;
    });
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    const appData: IAppData = { userTiles: items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private onEditTitle(id: number, name: string, url: string, icon: string): void {
    const items = this.state.items;
    const item = items.filter(x => x.item.id === id)[0].item;
    item.value = name;
    item.url = url;
    item.iconName = icon;
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    const appData: IAppData = { userTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private addTileHandle(): void {
    if(GlobalSettings.usePredefinedLinks){
      this.state.tileItemsService.getPredefinedItems().then(predefinedLinks => {
        this.setState({
          sidePanelOpen: !this.state.sidePanelOpen,
          predefinedLinks: predefinedLinks,
          panelType: PanelType.Add
        });
      });
    } else {
      this.setState({
        sidePanelOpen: !this.state.sidePanelOpen,
        predefinedLinks: [],
        panelType: PanelType.Add
      });
    }
  }

  private editTileHandle = (item: ITileItem): void => {
    this.setState({
      sidePanelOpen: !this.state.sidePanelOpen,
      panelType: PanelType.Edit,
      itemToEdit: {
        id: item.id,
        url: item.url,
        value: item.value,
        iconName: item.iconName
      }
    });
  }
}
