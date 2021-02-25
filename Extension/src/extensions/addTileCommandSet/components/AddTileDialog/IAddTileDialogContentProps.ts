export default interface IAddTileDialogContentProps {
    name: string;
    url: string;
    showError: boolean;
    close: () => void;
    onAddNewTile?: (name:string, url:string) => void;
}