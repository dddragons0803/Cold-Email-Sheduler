import axios from 'axios';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL' });
    console.error('Error logging in:', error);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL' });
    console.error('Error registering:', error);
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await axios.get('http://localhost:3000/api/auth/profile');
    dispatch({ type: 'USER_LOADED', payload: response.data });
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR' });
    console.error('Error loading user:', error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
