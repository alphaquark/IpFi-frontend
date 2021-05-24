import { createAction, createReducer } from '@reduxjs/toolkit';

export const userFetch = createAction('userFetch');
export const userData = createAction('userData');
export const userError = createAction('userError');

const initialState = {
    loading: false,
    error: false,
    success: false,
    users: [],
};

export const userReducer = createReducer(initialState, {
    [userFetch]: (state, action) => {
        return {
            ...state,
            loading: true,
            success: false,
            error: false,
        };
    },
    [userData]: (state, action) => {
        return {
            ...state,
            loading: false,
            success: true,
            error: false,
            users: action.payload,
        };
    },
    [userError]: (state, action) => {
        return {
            ...state,
            loading: false,
            success: false,
            error: true,
        };
    },
});
