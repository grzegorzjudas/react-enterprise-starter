import { AnyAction } from 'redux';

import { ReduxActionType, StateUI } from 'client/types/Redux';

function getInitialState (): StateUI {
    return {
        text: 'Hello world!'
    };
}

export default function (state: StateUI = getInitialState(), action: AnyAction): StateUI {
    switch (action.type) {
        case ReduxActionType.UI_SET_TEXT: {
            return { ...state, text: action.payload.text };
        }
        default: return state;
    }
}
