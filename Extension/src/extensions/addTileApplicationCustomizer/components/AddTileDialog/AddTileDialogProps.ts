export default interface IAddTileDialogProps {
    showDialog: boolean;
    onDismiss?: () => void;
    name: string;
    url: string;
    showError: boolean;
}