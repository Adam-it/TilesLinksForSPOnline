import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import styles from '../../styles/PersonalTiles.module.scss';

export default SortableElement(({ item }) => (
    <div className={ styles.item }>
      <div className={ styles.innerItem }>
        {item.value}
      </div>
    </div>
  ));