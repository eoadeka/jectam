import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/projects/';
const BASE_URL = 'https://jectam-backend.onrender.com/projects/';

export const fetchProject = async (projectId) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    
    const response = await axios.get(`${BASE_URL}projects/${projectId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  withCredentials: true
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const fetchTasksForProject = async (projectId) => {
  try {
    const response = await axios.get(`${BASE_URL}projects/${projectId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
    throw error;
  }
};

export const fetchTasks = async (taskId) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    
      const response = await axios.get(`${BASE_URL}projects/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },  withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching tasks:', error);
    }
  };

export const createTask = async (formData) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    
      const response = await axios.post(`${BASE_URL}tasks/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          },  withCredentials: true
      });
      // Reload the page after project is created
      // window.location.reload();
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating task:', error);
    }
  };

  export const updateTask = async (taskId, taskData) => {
    const token = localStorage.getItem('refresh_token');

    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
  
    try {
      const accessToken = localStorage.getItem('access_token');
      
      const response = await axios.put(`${BASE_URL}tasks/${taskId}/`, taskData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },  withCredentials: true
      });
      // Reload the page after task is created
      // window.location.reload();
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };
  
export  const deleteTask = async (taskId) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
      const response = await axios.delete(`${BASE_URL}tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },  withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error('Error deleting task:', error);
    }
};
