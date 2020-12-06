import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import sortableStyles from '../../styles/Sortable.module.scss';
import { arrayMove } from 'react-sortable-hoc';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MSGraphClient } from "@microsoft/sp-http";
import SortableList from '../sortableList/SortableList';
import Loader from '../loader/Loader';
import NoItems from '../noItems/NoItems';
import ErrorPanel from '../errorPanel/ErrorPanel';
import ToolBar from '../toolbar/ToolBar';
import Panel from '../panelLayout/Panel';
import { PanelPosition } from '../../model/enums/PanelPosition';
import AddPanel from '../addPanel/AddPanel';
import EditPanel from '../editPanel/EditPanel';
import { PanelType } from '../../model/enums/PanelType';
import ITileItem from '../../model/ITileItem';
import IAppData from '../../model/IAppData';
import TileItemsService from '../../services/tileItemsService/TileItemsService';
import ITileItemsServiceInput from '../../model/tileItemsService/ITileItemsServiceInput';
import mockTiles from '../../mocks/mockTiles';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {

  constructor(props) {
    super(props);
    
    let items = new Array();
    let itemToEdit: ITileItem = null;
    let sortingIsActive: boolean = false;
    let isLoading: boolean = true;
    let isEmpty: boolean = false;
    let sidePanelOpen: boolean = false;
    let panelType: PanelType = PanelType.Add;
    let tileItemsService: TileItemsService = null;
    let isError: boolean = false;
    let errorDescription: string = "";

    this.state = { 
      items,
      itemToEdit,
      sortingIsActive,
      isLoading,
      isEmpty,
      sidePanelOpen,
      panelType,
      tileItemsService,
      isError,
      errorDescription
    };
  }

  public componentDidMount(): void {
    if (!this._IsWorkbench()){
      this.props.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient): void => {
            let input: ITileItemsServiceInput = {
              httpClient: this.props.context.httpClient,
              mSGraphClient: client
            };

            this.setState({tileItemsService: new TileItemsService(input)});

            try {
              this.state.tileItemsService
                .checkIfAppDataFolderExists()
                .then(appDataFolderExists => {
                  if (!appDataFolderExists){
                    this.state.tileItemsService
                    .createAppDataFolder()
                    .then(folderName => {
                      if (folderName === null) {
                        this.setState({
                          isError: true,
                          errorDescription: strings.ErrorCouldNotGetData
                        });
                      } else {
                        this._LoadData();
                      }
                    });
                  } else {
                    this._LoadData();
                  }
                });
              } catch(exception) {
                this.setState({
                  isError: true,
                  errorDescription: strings.ErrorCouldNotGetData
                });
              }
          });
    }
    else{
      let mockedTilesList = mockTiles.getTiles();
      this.setState({
        items: mockedTilesList.map((item) => {
          return{
            item,
            editTileClick: this._editTileHandle
          };
        }),
        isLoading: false,
        isEmpty: mockedTilesList.length === 0
      });
    }
  }

  private _LoadData(): void {
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
          items: appData.UserTiles.map((item) =>{
            return{
              item,
              editTileClick: this._editTileHandle
            };
          }),
          isLoading: false,
          isEmpty: appData.UserTiles.length === 0
        });
      }
    });
  }

  private _IsWorkbench(): boolean {
    if (Environment.type == EnvironmentType.Local)
      return true;

    return false;
  }

  private _onSortEnd = ({oldIndex, newIndex}): void => {
    let prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
      sortingIsActive: false
    });

    let appData: IAppData = { UserTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private _onSortStart = (): void => {
    this.setState({sortingIsActive: true});
  }

  private _onPanelClosed(): void {
    this.setState({sidePanelOpen: false});
  }

  private _onAddNewTile(name:string, url:string, icon: string): void {
    let items = this.state.items;
    
    let nextItemId = items.map(item => item.item.id).sort((a, b) => b-a)[0];
    if (!nextItemId)
      nextItemId = 0;

    items.push({
      item:{
        id: nextItemId + 1,
        value: name,
        url: url,
        iconName: icon
      },
      editTileClick: this._editTileHandle
    });
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    let appData: IAppData = { UserTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private _onRemoveTile(id:number): void {
    let items = this.state.items;
    items = items.filter(x => {
      return x.item.id != id;
    });
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    let appData: IAppData = { UserTiles: items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private _onEditTitle(id:number, name:string, url:string, icon: string): void {
    let items = this.state.items;
    let item = items.filter(x => x.item.id === id)[0].item;
    item.value = name;
    item.url = url;
    item.iconName = icon;
    this.setState({
      items,
      isEmpty: items.length === 0
    });
    let appData: IAppData = { UserTiles: this.state.items.map(_ => _.item) };
    this.state.tileItemsService.createOrUpdateJsonDataFile(appData);
  }

  private _addTileHandle(): void {
    this.setState({ 
      sidePanelOpen: !this.state.sidePanelOpen,
      panelType: PanelType.Add
    });
  }

  private _editTileHandle = (item: ITileItem): void => {
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

  public render() {
    const { 
      items, 
      sortingIsActive,
      isLoading,
      isEmpty,
      sidePanelOpen,
      panelType,
      itemToEdit,
      isError,
      errorDescription } = this.state;

    const { 
      webpartTitle,
      webpartInfo } = this.props.webpartLabelConfig;

    return (
      <div className={mainStyles.personalTiles}>
        <div className={mainStyles.grid}>
          <div className={mainStyles.row}>
            <div className= {mainStyles.columnFullWidth}>
              <Label className={mainStyles.title}>{webpartTitle}</Label>
            </div>
          </div>
          <div className={mainStyles.row}>
            <div className= {mainStyles.columnFullWidth}>
              <ToolBar addHandel={() => this._addTileHandle()} infoText={webpartInfo}/>
            </div>
          </div>
          <div className={mainStyles.row}>
            <div className={mainStyles.columnFullWidth}>
              <div className={!isLoading || isError ? mainStyles.hide : null}>
                <Loader/>
              </div>
              <div className={!isError ? mainStyles.hide : null}>
                <ErrorPanel errorDescription={errorDescription}/>
              </div>
              <div className={isError ? mainStyles.hide : null}>
                  <div className={!isEmpty ? mainStyles.hide : null}>
                    <NoItems/>
                  </div>
                  <div className={sortingIsActive ? sortableStyles.isSortingActive : null} >
                    <SortableList 
                      items={items} 
                      axis="xy"
                      helperClass={sortableStyles.sortableItemDragging}
                      onSortEnd={this._onSortEnd}
                      onSortStart={this._onSortStart}
                      useDragHandle={true} />
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Panel isOpen={sidePanelOpen} position={PanelPosition.Right} onDismiss={this._onPanelClosed.bind(this)}>
          {panelType === PanelType.Add ? 
            <AddPanel onDismiss={() => this._onPanelClosed()} onAddNewTile={this._onAddNewTile.bind(this)} iconPickerRenderOption={"dialog"} /> : 
            <EditPanel tile={itemToEdit} onDismiss={() => this._onPanelClosed()} onRemove={this._onRemoveTile.bind(this)} onEdit={this._onEditTitle.bind(this)} iconPickerRenderOption={"dialog"}/>}
        </Panel>
      </div>
    );
  }
}
