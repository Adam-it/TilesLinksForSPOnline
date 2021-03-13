import * as React from 'react';
import * as classnames from 'classnames';
import { PanelPosition } from '../../model/enums/PanelPosition';
import { Layer, IconButton } from 'office-ui-fabric-react';
import IPanelProps from './IPanelProps';
import IPanelState from './IPanelState';
import panelStyles from '../../styles/Panel.module.scss';

export default class Panel extends React.Component<IPanelProps, IPanelState> {
    private onCloseTimer: number;

    public constructor(props: IPanelProps, state: IPanelState) {
        super(props, state);

        this.state = {
            isOpen: this.props.isOpen,
            isVisible: false
        };
    }

    public componentWillReceiveProps(newProps: IPanelProps): void {
        if (newProps.isOpen === this.props.isOpen) {
            return;
        }

        clearTimeout(this.onCloseTimer);

        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true
                });
            }
            else {
                this.setState({
                    isVisible: true
                });
            }
        }

        if (!newProps.isOpen && this.state.isOpen) {
            this.close();
        }
    }

    public componentDidUpdate(prevProps: IPanelProps, prevState: IPanelState): void {
        if (!prevProps.isOpen && !prevState.isVisible && this.state.isOpen) {
            setTimeout(this.onOpen.bind(this), 45);
        }
    }

    public render() {
        if (!this.state.isOpen) {
            return null;
        }

        const optionalClasses: any = {};
        optionalClasses[panelStyles.visible] = this.state.isVisible;
        optionalClasses[panelStyles.left] = this.props.position === PanelPosition.Left;
        optionalClasses[panelStyles.right] = this.props.position === PanelPosition.Right;
        const className = classnames(panelStyles.panel, optionalClasses);

        return (
            <Layer>
                <div className={className}>
                    <div className={panelStyles.header}>
                        <div className={panelStyles.closeButton}>
                            <IconButton
                                iconProps={{ iconName: 'Cancel' }}
                                onClick={this.onDismiss.bind(this)} />
                        </div>
                        <div className={panelStyles.clear}></div>
                    </div>
                    <div className={panelStyles.content}>
                        {this.props.children}
                    </div>
                </div>
            </Layer>);
    }

    private onDismiss(): void {
        this.close();
    }

    private close(): void {
        this.onCloseTimer = setTimeout(this.onClose.bind(this), parseFloat(panelStyles.duration));
        this.setState({
            isVisible: false
        });
    }

    private onOpen(): void {
        this.setState({
            isVisible: true
        });
    }

    private onClose(): void {
        this.setState({
            isOpen: false
        });

        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }
}