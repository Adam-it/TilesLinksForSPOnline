import * as React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import GlobalSettings from '../../globals/GlobalSettings';
import sortableStyles from '../../styles/Sortable.module.scss';

export default SortableElement(({ item }) => {
  // tslint:disable-next-line: variable-name
  const DragHandle = SortableHandle(() =>
    <label className={sortableStyles.moveButton}>
      <Icon iconName={'Move'} />
    </label>);
  const tileItem = item.item;
  let displayName = tileItem.value;
  if (displayName.length >= GlobalSettings.maxTileNameLength) {
    displayName = `${displayName.substring(0, 13)}...`;
  }
  const hasIcon: boolean = typeof tileItem.iconName !== 'undefined' && tileItem.iconName !== '';

  return (
    <div className={sortableStyles.sortableItem}>
      <label className={sortableStyles.editButton} onClick={() => { item.editTileClick(tileItem); }}>
        <Icon iconName={'Edit'} />
      </label>
      <DragHandle />
      <a className={sortableStyles.sortableInnerItem} href={tileItem.url}>
        <Icon iconName={tileItem.iconName} />
        <span className={hasIcon ? '' : sortableStyles.noIcon}>{displayName}</span>
      </a>
    </div>
  );
});