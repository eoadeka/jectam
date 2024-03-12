import axios from 'axios';

const BASE_URL = 'http://localhost:8000/projects/';

// Function to fetch all projects
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}projects/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Function to create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${BASE_URL}projects/`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Function to update a project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${BASE_URL}projects/${projectId}/`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Function to delete a project
export const deleteProject = async (projectId) => {
  try {
    await axios.delete(`${BASE_URL}projects/${projectId}/`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
