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
    let items = this.props.tiles;
    this.state = { items };
  }

  public onSortEnd = ({oldIndex, newIndex}) => {
    let prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
    });
    console.log(this.state.items);
  }

  public render() {
    const { strings } = this.props;
    return (
      <div className={ mainStyles.personalTiles }>
        <div className={ mainStyles.grid }>
          <div className={ mainStyles.row }>
            <div className= { mainStyles.columnFullWidth }>
              <ToolBar 
              AddButtonLabel= { strings.AddNewTileButton }
              InfoButtonLabel= { strings.InfoButton }/>
            </div>
          </div>
          <div className={ mainStyles.row }>
            <div className={ mainStyles.columnFullWidth }>
              <SortableList 
                items={ this.state.items } 
                axis="xy"
                helperClass={ sortableStyles.sortableItemDragging }
                onSortEnd={ this.onSortEnd } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
