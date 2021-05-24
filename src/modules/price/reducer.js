import { createAction, createReducer } from '@reduxjs/toolkit';

export const setPrice = createAction('setPrice');

const initialState = {
    ethusd: 0,
    ethtoken: 0,
    usdeth: 0,
};

export const priceReducer = createReducer(initialState, {
    [setPrice]: (state, action) => {
        return {
            ...state,
            [action.payload.target]: action.payload.value,
        };
    },
});
