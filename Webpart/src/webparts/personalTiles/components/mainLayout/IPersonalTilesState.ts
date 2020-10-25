import { PanelType } from '../panelLayout/PanelType';

export default interface IPersonalTilesState {
    items: 
    { 
        id: number, 
        value: string,
        url: string,
        editTileClick: any
    }[];
    itemToEdit: {
        id: number, 
        value: string,
        url: string,
    };
    sortingIsActive: boolean;
    sidePanelOpen: boolean;
    panelType: PanelType;
}