// store.js
import { applyMiddleware, createStore, combineReducers } from 'redux';
import EmployeeReducer from './reducers/EmployeeDataReducer';
import SelectedDataReducer from './reducers/SelectedDataReducer';

// Combine reducers
const rootReducer = combineReducers({
    EmployeeReducer: EmployeeReducer,
    selectedData: SelectedDataReducer
});

// Create store with combined reducers
const store = createStore(EmployeeReducer);

export default store;
