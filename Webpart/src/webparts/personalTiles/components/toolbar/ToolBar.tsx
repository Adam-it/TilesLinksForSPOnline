import * as React from 'react';
import * as strings from 'PersonalTilesWebPartStrings';
import { CommandBar } from 'office-ui-fabric-react';
import IToolBarProps from './IToolBarProps';
import IToolBarState from './IToolBarState';
import mainStyles from '../../styles/PersonalTiles.module.scss';

export default class ToolBar extends React.Component<IToolBarProps, IToolBarState> {

    constructor(props: IToolBarProps) {
        super(props);
        this.state = {
            items: [{
                key: 'newItem',
                text: strings.AddNewTileButton,
                iconProps: { iconName: 'Add' },
                onClick: this.props.addHandel
            }],
            farItems: null
        };
    }

    public componentDidUpdate() {
        const { infoText } = this.props;
        const farItems = this.state.farItems;
        if ((infoText !== '' && farItems === null) || (farItems !== null && infoText !== farItems[0].text)) {
            if (infoText !== '') {
                this.setState({
                    farItems: [{
                        key: 'info',
                        text: infoText,
                        iconOnly: true,
                        iconProps: { iconName: 'Info' }
                    }]
                });
            } else {
                this.setState({
                    farItems: null
                });
            }
        }
    }

    public render() {
        return (
            <div className={mainStyles.toolBar}>
                <CommandBar
                    items={this.state.items}
                    farItems={this.state.farItems}
                />
            </div>
        );
    }
}
