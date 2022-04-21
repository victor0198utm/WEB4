import {
  CHANGE_SCORE,
  CHANGE_USER_ID,
  CHANGE_USER_NAME,
  CHANGE_USER_SURNAME,
  CHANGE_QUIZ_ID,
} from "./actionsTypes";

const initialState = {
  user_ID: 0,
  name: "", 
  surname: "",
  quiz_ID: 0,
  score: 0,
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case CHANGE_USER_ID:
      return {
        ...state,
        user_ID: action.payload,
      };
    case CHANGE_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_USER_SURNAME:
      return {
        ...state,
        surname: action.payload,
      };
    case CHANGE_QUIZ_ID:
      return {
        ...state,
        quiz_ID: action.payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
