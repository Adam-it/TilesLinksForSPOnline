import { PanelType } from '../panelLayout/PanelType';

export default interface IPersonalTilesState {
    items: 
    { 
        id: number, 
        value: string,
        url: string,
        editTileClick: any
    }[];
    sortingIsActive: boolean;
    sidePanelOpen: boolean;
    panelType: PanelType;
}