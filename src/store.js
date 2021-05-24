import { configureStore } from '@reduxjs/toolkit';
import { userReducer, rootUsersSaga, priceReducer, langReducer } from './modules';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const reducer = {
    users: userReducer,
    price: priceReducer,
    lang: langReducer,
};

export function* rootSaga() {
    yield all([call(rootUsersSaga)]);
}

const createAppStore = () => {
    const Store = configureStore({ reducer, middleware: [sagaMiddleware] });
    sagaMiddleware.run(rootSaga);
    return Store;
};

export { createAppStore };
