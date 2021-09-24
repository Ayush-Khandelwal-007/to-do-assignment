import authReducer from 'contexts/auth/reducer';
import todoReducer from 'contexts/todos/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: authReducer,
    todo: todoReducer,
});

export default rootReducer;
