import {PAN_TO} from '@js/actions/identify';

export default function map(state, action) {
    switch (action.type) {
        case PAN_TO: {
            return {
                ...state,
                center: action.center
            };
        }
        default: return state;
    }
}
