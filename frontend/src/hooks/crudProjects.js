import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/projects/';
const BASE_URL = 'https://jectam-backend.onrender.com/projects/';

// Function to fetch all projects
export const fetchProjects = async () => {
  const token = localStorage.getItem('access_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.get(`${BASE_URL}projects/`, {
      headers: {
        // 'Authorization': "JWT " + localStorage.getItem('access_token'),
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
        },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Function to create a new project
export const createProject = async (projectData) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(`${BASE_URL}projects/`, projectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Function to update a project
export const updateProject = async (projectId, projectData) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.put(`${BASE_URL}projects/${projectId}/`, projectData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Function to delete a project
export const deleteProject = async (projectId) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    
    await axios.delete(`${BASE_URL}projects/${projectId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  withCredentials: true
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
