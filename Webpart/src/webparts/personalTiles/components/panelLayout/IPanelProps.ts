import { PanelPosition } from '../../model/enums/PanelPosition';

export default interface IPanelProps {
    isOpen?: boolean;
    position?: PanelPosition;
    onDismiss?: () => void;
}