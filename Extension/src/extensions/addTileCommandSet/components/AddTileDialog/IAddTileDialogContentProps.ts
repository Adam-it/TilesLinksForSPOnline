export default interface IAddTileDialogContentProps {
    name: string;
    url: string;
    showError: boolean;
    isFolder: boolean;
    isItem: boolean;
    fileType: string;
    close: () => void;
    onAddNewTile?: (name:string, url:string, icon: string) => void;
}