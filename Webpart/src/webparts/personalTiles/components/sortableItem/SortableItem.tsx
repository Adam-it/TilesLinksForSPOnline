import * as React from 'react';
import sortableStyles from '../../styles/Sortable.module.scss';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

export default SortableElement(({ item }) => {
  const DragHandle = SortableHandle(() => 
  <label className={ sortableStyles.moveButton }>
    <i className="ms-Icon ms-Icon--Move" aria-hidden="true"></i>
  </label>);

  return(
    <div className={ sortableStyles.sortableItem }>
      <label className={ sortableStyles.editButton } onClick={ () => { item.editTileClick(item); } }>
        <i className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i>
      </label>
      <DragHandle />
      <a className={ sortableStyles.sortableInnerItem } href="#">
        { item.value }
      </a>
    </div>
  );
});