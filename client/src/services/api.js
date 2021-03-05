import axios from 'axios';
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const getAllProjects = () => {
  return axios.get(`${baseURL}/projects`);
};
export const getProject = id => {
  return axios.get(`${baseURL}/projects/${id}`);
};
export const addProject = project => {
  return axios.post(`${baseURL}/projects`, project);
};
export const deleteProject = id => {
  return axios.delete(`${baseURL}/projects/${id}`);
};
export const updateProject = project => {
  return axios.put(`${baseURL}/projects/${project.id}`, project);
};
export const uploadFile = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
