import * as React from 'react';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import sortableStyles from '../../styles/Sortable.module.scss';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from '../sortableList/SortableList';
import ToolBar from '../toolbar/ToolBar';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {

  constructor(props) {
    super(props);
    
    let items = this.props.tiles.map((item) => {
      return{
        id: item.id,
        value: item.value,
        editTileClick: this.editTileHandle
      };
    });
    let sortingIsActive = false;

    this.state = { 
      items,
      sortingIsActive
    };
  }

  public editTileHandle = (item) => {
    console.log(item.id);
  }

  public onSortEnd = ({oldIndex, newIndex}) => {
    let prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
      sortingIsActive: false
    });
    console.log(this.state.items);
  }

  public onSortStart = () => {
    this.setState({ sortingIsActive: true });
  }

  public render() {
    return (
      <div className={ mainStyles.personalTiles }>
        <div className={ mainStyles.grid }>
          <div className={ mainStyles.row }>
            <div className= { mainStyles.columnFullWidth }>
              <ToolBar />
            </div>
          </div>
          <div className={ mainStyles.row }>
            <div className={ mainStyles.columnFullWidth }>
              <div className={ this.state.sortingIsActive ? sortableStyles.isSortingActive : null } >
                <SortableList 
                  items={ this.state.items } 
                  axis="xy"
                  helperClass={ sortableStyles.sortableItemDragging }
                  onSortEnd={ this.onSortEnd }
                  onSortStart={ this.onSortStart }
                  useDragHandle={ true } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
