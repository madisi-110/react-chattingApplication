import userReducer from './usersReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  userReducer,
});
