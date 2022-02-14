import {
  GET_USERS,
  ADD_USER,
  SET_CURRENT_USER,
  SAVE_MESSAGE,
} from '../actionTypes/chatActionTypes';
import axios from 'axios';

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function addingUserInList(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function setUser(id) {
  return {
    type: SET_CURRENT_USER,
    id,
  };
}

export function storeMessage(msg) {
  return {
    type: SAVE_MESSAGE,
    msg,
  };
}
export const AddUser = (dispatch, user) => {
  dispatch(addingUserInList(user));
};

export function setCurrentUser(dispatch, id) {
  dispatch(setUser(id));
}

export function saveMessage(dispatch, msgObj) {
  dispatch(storeMessage(msgObj));
}

export const getUsersApi = (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => {
        // reject(Toast({ type: 'error', message: error.toString(), time: 3000 }));
      });
  });
};
