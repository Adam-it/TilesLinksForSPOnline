export default interface IEditPanelProps {
    tile: 
    { 
        id: number, 
        value: string,
        url: string
    };
    onDismiss?: () => void;
    onRemove?: (id:number) => void;
    onEdit?: (id:number, name:string, url:string) => void;
}