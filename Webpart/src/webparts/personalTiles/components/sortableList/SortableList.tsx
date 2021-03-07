import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import sortableStyles from '../../styles/Sortable.module.scss';
import SortableItem from '../sortableItem/SortableItem';

export default SortableContainer(({ items }) => (
  <div className={sortableStyles.sortableContainer}>
    {items.map((item, index) => (
      <SortableItem
        key={item.id}
        index={index}
        item={item}
      />
    ))}
  </div>
));