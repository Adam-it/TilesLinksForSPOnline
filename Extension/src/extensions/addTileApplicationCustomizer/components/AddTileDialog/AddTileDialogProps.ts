export default interface IAddTileDialogProps {
    showDialog: boolean;
    onDismiss?: () => void;
    name: string;
    url: string;
    showError: boolean;
    onAddNewTile?: (name:string, url:string, icon: string) => void;
}