export default interface IAddPanelProps {
    onDismiss: () => void;
    onAddNewTile: (name: string, url: string, icon: string) => void;
    iconPickerRenderOption: 'dialog' | 'panel';
}