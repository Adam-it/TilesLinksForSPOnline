import * as React from 'react';
import styles from './PersonalTiles.module.scss';
import IPersonalTilesProps from './IPersonalTilesProps';
import IPersonalTilesState from './IPersonalTilesState';

export default class PersonalTiles extends React.Component<IPersonalTilesProps, IPersonalTilesState> {
  public render() {
    return (
      <div className={ styles.personalTiles }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Tiles Webpart</span>
          </div>
        </div>
      </div>
    );
  }
}
