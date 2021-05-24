import { createAction, createReducer } from '@reduxjs/toolkit';

export const setLang = createAction('setLang');

const initialState = {
    currentLang: localStorage.getItem('aqtDeFiLang') ? localStorage.getItem('aqtDeFiLang') : 'en',
};

export const langReducer = createReducer(initialState, {
    [setLang]: (state, action) => {
        return {
            ...state,
            currentLang: action.payload,
        };
    },
});
