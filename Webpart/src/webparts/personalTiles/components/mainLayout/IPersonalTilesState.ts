import ITileItem from '../../model/ITileItem';
import { PanelType } from '../panelLayout/PanelType';

export default interface IPersonalTilesState {
    items: 
    { 
        item: ITileItem,
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