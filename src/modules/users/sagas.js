import { takeLatest, put } from 'redux-saga/effects';
import { userFetch, userData, userError } from './reducer';

function* userFetchSaga(action) {
    try {
        // const { data, headers } = yield call(API.get(requestOptions), `/admin/adjustments?${params}`);
        yield put(
            userData([
                {
                    id: 0,
                    name: '정명훈',
                    password: '123456',
                    todos: [],
                },
                { id: 9999, name: 'guest', todos: [] },
            ])
        );
    } catch (error) {
        console.log(error);
        yield put(userError());
    }
}

export function* rootUsersSaga() {
    yield takeLatest(userFetch, userFetchSaga);
}
