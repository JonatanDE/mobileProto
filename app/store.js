// @flow
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
import {AsyncStorage} from "react-native";
import * as reducers from './reducers';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// combine reducers
const reducer = combineReducers(reducers);

const store = createStore(reducer, compose(
	applyMiddleware(thunk, sagaMiddleware),
	autoRehydrate()
));

persistStore(store, {storage: AsyncStorage});
//clear storage
// persistStore(store, {storage: AsyncStorage}).purge();

export default store;
