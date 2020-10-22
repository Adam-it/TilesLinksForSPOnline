import { PanelPosition } from './PanelPosition';

export default interface IPanelProps {
    isOpen?: boolean;
    position?: PanelPosition;
    onDismiss?: () => void;
}