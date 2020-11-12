import ITileItem from '../../model/ITileItem';
import { PanelType } from '../../model/enums/PanelType';
import TileItemsService from '../../services/tileItemsService/TileItemsService';

export default interface IPersonalTilesState {
    items: 
    { 
        item: ITileItem,
        editTileClick: any
    }[];
    itemToEdit: ITileItem;
    sortingIsActive: boolean;
    sidePanelOpen: boolean;
    panelType: PanelType;
    tileItemsService: TileItemsService;
}