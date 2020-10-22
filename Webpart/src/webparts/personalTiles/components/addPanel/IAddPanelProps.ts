export default interface IAddPanelProps {
    onDismiss?: () => void;
    onAddNewTile?: (name:string, url:string) => void;
}