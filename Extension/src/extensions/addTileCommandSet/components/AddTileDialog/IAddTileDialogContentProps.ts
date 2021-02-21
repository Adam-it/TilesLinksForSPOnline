export default interface IAddTileDialogContentProps {
    name: string;
    url: string;
    close: () => void;
    onAddNewTile?: (name:string, url:string) => void;
}