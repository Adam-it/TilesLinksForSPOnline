import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from '../sortableItem/SortableItem';
import styles from '../../styles/PersonalTiles.module.scss';

export default SortableContainer(({ items }) => (
    <div className={ styles.sortablecontainer }>
      {items.map((item, index) => (
        <SortableItem
          key={`${item.id}`}
          index={index}
          item={item}
        />
      ))}
    </div>
  ));