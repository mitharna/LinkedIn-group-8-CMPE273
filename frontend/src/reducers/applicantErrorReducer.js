import {APPLICANT_SIGNUP_ERROR_REDUCER} from '../actions/types';

const initialState = {
    error: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLICANT_SIGNUP_ERROR_REDUCER:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;

    }

}