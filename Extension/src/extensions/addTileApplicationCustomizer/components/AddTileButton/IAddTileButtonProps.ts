import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export default interface IAddTileButtonProps {
    name: string;
    url: string;
    context: ApplicationCustomizerContext;
}