import {
  GET_USERS,
  ADD_USER,
  SET_CURRENT_USER,
  SAVE_MESSAGE,
} from '../actionTypes/chatActionTypes';

const initialState = { users: [], user: {} };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.users.map((user) => ({
          id: user.id,
          name: user.name,
          messages: [],
        })),
        user: {
          id: action.users[0].id,
          name: action.users[0].name,
          messages: [],
        },
      };

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
        user: { ...state.user },
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        users: [...state.users],
        user: state.users.find((user) => user.id === action.id),
      };

    case SAVE_MESSAGE:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === state.user.id) {
            return {
              ...user,
              messages: [
                ...state.user.messages,
                {
                  id: state.user.messages.length + 1,
                  message: action.msg.message,
                },
              ],
            };
          } else {
            return {
              ...user,
            };
          }
        }),

        // {
        // ...user,

        // messages: [
        //   ...state.user.messages,
        //   { id: state.user.messages.length + 1, message: action.msg.message },
        // ],
        // }),
        // ...state.users,
        // [
        //   state.user.messages,
        //   { id: state.user.messages.length + 1, message: action.msg.message },
        // ],

        user: {
          ...state.user,
          messages: [
            ...state.user.messages,
            { id: state.user.messages.length + 1, message: action.msg.message },
          ],
        },
      };
    // case GET_SINGLE_BOOK :
    // return {
    //     ...state,
    //     books:[],
    //     book:action.book
    // }

    default:
      return state;
  }
}
