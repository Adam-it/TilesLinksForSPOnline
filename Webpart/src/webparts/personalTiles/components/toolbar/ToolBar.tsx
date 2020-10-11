import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import IToolBarProps from './IToolBarProps';
import IToolBarState from './IToolBarState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { CommandBar } from 'office-ui-fabric-react';

export default class ToolBar extends React.Component<IToolBarProps, IToolBarState> {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                key: 'newItem',
                text: strings.AddNewTileButton,
                iconProps: { iconName: 'Add' }
            }],
            farItems: [{
                key: 'info',
                text: strings.InfoButton,
                iconOnly: true,
                iconProps: { iconName: 'Info' }
              }]
        };
    }

    public render() {
        
        return(
            <div className={ mainStyles.toolBar }>
                <CommandBar
                    items={ this.state.items }
                    farItems={ this.state.farItems }
                />
            </div>
        );
    }
}