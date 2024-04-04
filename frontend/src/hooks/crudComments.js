import axios from 'axios';

const BASE_URL = 'http://localhost:8000/comments/';


export const fetchCommentsForTask = async (taskId) => {
    try {
      const response = await axios.get(`${BASE_URL}comments/${taskId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments for task:', error);
      throw error;
    }
  };

// Function to fetch all comments
export const fetchComments = async () => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const response = await axios.get(`${BASE_URL}comments/`, {
      headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
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

// Function to create a new comment
export const createComment = async (comment, taskId, userId) => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.post(`${BASE_URL}comments/`, {
        comment: comment,
        task: taskId,
        commenter: userId
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  withCredentials: true
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// Function to update a comment
export const updateComment = async (commentId, comment, taskId, userId) => {
  try {
    const response = await axios.put(`${BASE_URL}comments/${commentId}/`, {
        comment: comment,
        task: taskId,
        commenter: userId 
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Function to delete a comment
export const deleteComment = async (commentId, comment, taskId, userId) => {
  try {
    await axios.delete(`${BASE_URL}comments/${commentId}/`,  {
        comment: comment,
        task: taskId,
        commenter: userId 
    },);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
