import * as React from 'react';
import GlobalSettings from '../../globals/GlobalSettings';
import sortableStyles from '../../styles/Sortable.module.scss';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default SortableElement(({item}) => {
  const DragHandle = SortableHandle(() => 
  <label className={sortableStyles.moveButton}>
    <Icon iconName={"Move"} />
  </label>);
  let tileItem = item.item;
  let displayName = tileItem.value;
  if (displayName.length >= GlobalSettings.maxTileNameLength)
    displayName = `${displayName.substring(0, 13)}...`;

  return(
    <div className={sortableStyles.sortableItem}>
      <label className={sortableStyles.editButton} onClick={() => {item.editTileClick(tileItem);}}>
        <Icon iconName={"Edit"} />
      </label>
      <DragHandle />
      <a className={sortableStyles.sortableInnerItem} href={tileItem.url}>
        {displayName}
      </a>
    </div>
  );
});