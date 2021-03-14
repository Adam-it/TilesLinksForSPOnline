export default interface IAddTileDialogProps {
    showDialog: boolean;
    onDismiss: () => void;
    name: string;
    url: string;
    onAddNewTile: (name: string, url: string, icon: string) => void;
}