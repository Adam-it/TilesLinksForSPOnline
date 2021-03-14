import TileItemsService from '../../../services/tileItemsService/TileItemsService';

export default interface IAddTileButtonState {
    showDialog: boolean;
    tileItemsService: TileItemsService;
    showError: boolean;
}