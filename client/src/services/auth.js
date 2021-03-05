import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const signup = (username, password) => {
  return axios.post(`${baseURL}/signup`, { username, password });
};

export const login = (username, password) => {
  return axios.post(
    `${baseURL}/login`,
    { username, password },
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.post(`${baseURL}/logout`, null, { withCredentials: true });
};

export const loggedin = () => {
  return axios.get(`${baseURL}/loggedin`, { withCredentials: true });
};
