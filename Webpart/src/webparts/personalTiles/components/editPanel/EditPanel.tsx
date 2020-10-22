import * as React from 'react';
import IEditPanelProps from './IEditPanelProps';
import IEditPanelState from './IEditPanelState';

export default class EditPanel extends React.Component<IEditPanelProps, IEditPanelState> {

    constructor(props) {
        super(props);
    }

    public render() {        
        return(
            <div>
                <span>edit panel</span>
            </div>
        );
    }
}