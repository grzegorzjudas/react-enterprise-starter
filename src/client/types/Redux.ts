export enum ReduxActionType {
    UI_SET_TEXT = 'UI_SET_TEXT'
}

export type ReduxState = {
    ui: StateUI;
};

export type StateUI = {
    text: string;
};
