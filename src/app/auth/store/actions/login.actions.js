import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
// import * as Actions from 'app/store/actions';
import history from 'history.js';
import { NotificationManager } from 'react-notifications';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const submitLogin = ({ email, password }) => async dispatch => {
  try {
    let user = await jwtService.signInWithEmailAndPassword(email, password);
    if (user.error) {
      NotificationManager.error(user.error);
      dispatch({
        type: LOGIN_ERROR,
        payload: user.error
      });
      return;
    }
    if (user) {
      dispatch(setUserData(user));
      localStorage.setItem('username', user.username)
      localStorage.setItem('userid', user.id)
      history.push({
        pathname: '/dashboard'
      });
      dispatch({
        type: LOGIN_SUCCESS
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error
    });
  }
}
