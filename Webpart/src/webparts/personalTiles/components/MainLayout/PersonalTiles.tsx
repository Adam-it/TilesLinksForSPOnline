import * as React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableList from '../sortableList/SortableList';
import styles from '../../styles/PersonalTiles.module.scss';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {

  public state = {
    items: [
      {
        id: 0,
        value: "item1"
      },
      {
        id: 1,
        value: "item2"
      },
      {
        id: 2,
        value: "item3"
      },
      {
        id: 3,
        value: "item4"
      },
      {
        id: 4,
        value: "item5"
      },
      {
        id: 5,
        value: "item6"
      },
      {
        id: 6,
        value: "item7"
      },
    ]
  };

  public onSortEnd = ({oldIndex, newIndex}) => {
    let prevItems = this.state.items;
    this.setState({
      items: arrayMove(prevItems, oldIndex, newIndex),
    });
    console.log(this.state.items);
  };

  public render() {
    return (
      <div className={ styles.personalTiles }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Tiles Webpart</span>
            <SortableList 
              items={this.state.items} 
              axis="xy"
              onSortEnd={this.onSortEnd} />
          </div>
        </div>
      </div>
    );
  }
}
