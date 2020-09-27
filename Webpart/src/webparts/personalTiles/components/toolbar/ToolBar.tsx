import * as React from 'react';
import IToolBarProps from './IToolBarProps';
import IToolBarState from './IToolBarState';
import mainStyles from '../../styles/PersonalTiles.module.scss';
import { CommandBar } from 'office-ui-fabric-react';

export default class ToolBar extends React.Component<IToolBarProps, IToolBarState> {

    constructor(props) {
        super(props);
        const { AddButtonLabel, InfoButtonLabel } = this.props;
        this.state = {
            items: [{
                key: 'newItem',
                text: AddButtonLabel,
                iconProps: { iconName: 'Add' }
            }],
            farItems: [{
                key: 'info',
                text: InfoButtonLabel,
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