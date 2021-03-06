import ITileItem from '../../model/ITileItem';

export default interface IEditPanelProps {
    tile: ITileItem;
    onDismiss: () => void;
    onRemove: (id: number) => void;
    onEdit: (id: number, name: string, url: string, icon: string) => void;
    iconPickerRenderOption: 'dialog' | 'panel';
}