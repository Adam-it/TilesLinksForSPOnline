declare interface IPersonalTilesWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneGeneralGroupName: string;
  PropertyPaneTitleField: string;
  PropertyPaneInfoField: string;
  AddNewTileButton: string;
  AddPanelTitle: string;
  AddPanelTileTitle: string;
  AddPanelTileUrl: string;
  AddPanelSetIcon: string;
  AddPanelSubmitButton: string;
  AddPanelCancelButton: string;
  EditPanelTitle: string;
  EditPanelTileTitle: string;
  EditPanelTileUrl: string;
  EditPanelSetIcon: string;
  EditPanelCancelButton: string;
  EditPanelSubmitEditButton: string;
  EditPanelDeleteButton: string;
  PanelTitleValidation: string;
  PanelUrlValidation: string;
  Loading: string;
  NoItemsText: string;
  ErrorText: string;
  ErrorPanelRefresh: string;
  ErrorCouldNotGetData: string;
}

declare module 'PersonalTilesWebPartStrings' {
  const strings: IPersonalTilesWebPartStrings;
  export = strings;
}
