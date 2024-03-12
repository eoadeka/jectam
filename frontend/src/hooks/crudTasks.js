import axios from 'axios';

const BASE_URL = 'http://localhost:8000/projects/';

export const fetchProject = async (projectId) => {
  try {
    const response = await axios.get(`${BASE_URL}projects/${projectId}/`);
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
    try {
      const response = await axios.get(`${BASE_URL}projects/tasks/${taskId}/`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching tasks:', error);
    }
  };

export const createTask = async (taskData) => {
    try {
      const response = await axios.post(`${BASE_URL}tasks`, taskData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating task:', error);
    }
  };

  export const updateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`${BASE_URL}tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating task:', error);
    }
  };
  
export  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${BASE_URL}tasks/${taskId}/`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting task:', error);
    }
};
