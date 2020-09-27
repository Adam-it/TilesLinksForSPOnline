import * as React from 'react';
import sortableStyles from '../../styles/Sortable.module.scss';
import { SortableElement } from 'react-sortable-hoc';

export default SortableElement(({ item }) => (
    <div className={ sortableStyles.sortableItem }>
      <a className={ sortableStyles.sortableInnerItem } href="#">
        { item.value }
      </a>
    </div>
  ));