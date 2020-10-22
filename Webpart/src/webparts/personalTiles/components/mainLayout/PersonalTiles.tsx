import * as React from 'react';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import sortableStyles from '../../styles/Sortable.module.scss';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from '../sortableList/SortableList';
import ToolBar from '../toolbar/ToolBar';
import Panel from '../panelLayout/Panel';
import { PanelPosition } from '../panelLayout/PanelPosition';
import AddPanel from '../addPanel/AddPanel';
import EditPanel from '../editPanel/EditPanel';
import { PanelType } from '../panelLayout/PanelType';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {

  constructor(props) {
    super(props);
    
    let items = this.props.tiles.map((item) => {
      return{
        id: item.id,
        value: item.value,
        url: item.url,
        editTileClick: this._editTileHandle
      };
    });
    let sortingIsActive:boolean = false;
    let sidePanelOpen:boolean = false;
    let panelType:PanelType = PanelType.Add;

    this.state = { 
      items,
      sortingIsActive,
      sidePanelOpen,
      panelType
    };
  }

  private _onSortEnd = ({oldIndex, newIndex}) => {
    let prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
      sortingIsActive: false
    });
    console.log(this.state.items);
  }

  private _onSortStart = () => {
    this.setState({sortingIsActive: true});
  }

  private _onPanelClosed() {
    this.setState({sidePanelOpen: false});
  }

  private _onAddNewTile(name:string, url:string){
    let items = this.state.items;
    items.push({
      id: items.length + 1,
      value: name,
      url: url,
      editTileClick: this._editTileHandle
    });
    this.setState({items});
  }

  private _addTileHandle() {
    this.setState({ 
      sidePanelOpen: !this.state.sidePanelOpen,
      panelType: PanelType.Add
    });
  }

  private _editTileHandle = (item) => {
    this.setState({ 
      sidePanelOpen: !this.state.sidePanelOpen,
      panelType: PanelType.Edit
    });
  }

  public render() {
    const { 
      items, 
      sortingIsActive, 
      sidePanelOpen,
      panelType } = this.state;

    return (
      <div className={mainStyles.personalTiles}>
        <div className={mainStyles.grid}>
          <div className={mainStyles.row}>
            <div className= {mainStyles.columnFullWidth}>
              <ToolBar addHandel={() => this._addTileHandle()}/>
            </div>
          </div>
          <div className={mainStyles.row}>
            <div className={mainStyles.columnFullWidth}>
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
        <Panel isOpen={sidePanelOpen} position={PanelPosition.Right} onDismiss={this._onPanelClosed.bind(this)}>
          {panelType === PanelType.Add ? 
            <AddPanel onDismiss={() => this._onPanelClosed()} onAddNewTile={this._onAddNewTile.bind(this)} /> : 
            <EditPanel/>}
        </Panel>
      </div>
    );
  }
}
