import ITileItem from "../../model/ITileItem";

export default interface IAddPanelProps {
    onDismiss: () => void;
    onAddNewTile: (name: string, url: string, icon: string) => void;
    predefinedLinks: ITileItem[];
    iconPickerRenderOption: 'dialog' | 'panel';
}