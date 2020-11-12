import * as React from 'react';
import IPanelProps from './IPanelProps';
import IPanelState from './IPanelState';
import panelStyles from '../../styles/Panel.module.scss';
import { PanelPosition } from '../../model/enums/PanelPosition';
import { Layer, IconButton } from 'office-ui-fabric-react';
import * as classnames from 'classnames';

export default class Panel extends React.Component<IPanelProps, IPanelState> {
    private _onCloseTimer: number;

    public constructor(props: IPanelProps, state: IPanelState) {
        super(props, state);

        this.state = {
            isOpen: this.props.isOpen
        };
    }

    public componentWillReceiveProps(newProps: IPanelProps): void {
        if (newProps.isOpen === this.props.isOpen)
            return;

        clearTimeout(this._onCloseTimer);

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
            this._close();
        }
    }

    public componentDidUpdate(prevProps: IPanelProps, prevState: IPanelState): void {
        if (!prevProps.isOpen && !prevState.isVisible && this.state.isOpen) {
            setTimeout(this._onOpen.bind(this), 45);
        }
    }

    private _onDismiss(): void {
        this._close();
    }

    private _close(): void {
        this._onCloseTimer = setTimeout(this._onClose.bind(this), parseFloat(panelStyles.duration));
        this.setState({
            isVisible: false
        });
    }

    private _onOpen(): void {
        this.setState({
            isVisible: true
        });
    }

    private _onClose(): void {
        this.setState({
            isOpen: false
        });

        if (this.props.onDismiss)
            this.props.onDismiss();
    }

    public render() {
        if (!this.state.isOpen)
            return null;

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
                                iconProps={{iconName: 'Cancel'}}
                                onClick={this._onDismiss.bind(this)} />
                        </div>
                        <div className={panelStyles.clear}></div>
                    </div>
                    <div className={panelStyles.content}>
                        {this.props.children}
                    </div>
                </div>
            </Layer>);
    }
}