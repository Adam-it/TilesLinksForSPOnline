declare interface IAddTileCommandSetCommandSetStrings {
  AddTile: string;
  DialogTitle: string;
  DialogCancelButton: string;
  DialogSubmitButton: string;
  DialogNameLabel: string;
  DialogUrlLabel: string;
  DialogNameValidation: string;
  DialogUrlValidation: string;
  DialogSetIcon: string;
  ErrorMessageClose: string
  ErrorMessage: string
}

declare module 'AddTileCommandSetCommandSetStrings' {
  const strings: IAddTileCommandSetCommandSetStrings;
  export = strings;
}
