import {
  CHANGE_USER_ID,
  CHANGE_USER_NAME,
  CHANGE_USER_SURNAME,
  CHANGE_QUIZ_ID,
  CHANGE_SCORE,
} from "./actionsTypes";

export const handleUserIDChange = (payload) => ({
  type: CHANGE_USER_ID,
  payload,
});

export const handleUserNameChange = (payload) => ({
  type: CHANGE_USER_NAME,
  payload,
});

export const handleUserSurnameChange = (payload) => ({
  type: CHANGE_USER_SURNAME,
  payload,
});

export const handleQuizIDChange = (payload) => ({
  type: CHANGE_QUIZ_ID,
  payload,
});

export const handleScoreChange = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});