import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/accounts/';
const BASE_URL = 'https://jectam-backend.onrender.com/accounts/';

// Function to fetch all document types
export const fetchRoleChoices = async () => {
    const token = localStorage.getItem('refresh_token');
  
    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
  
    try {
      const response = await axios.get(`${BASE_URL}role-choices/`, {
        headers: {
          'Authorization': "JWT " + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          'accept': 'application/json'
          },  withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching role choices:', error);
      throw error;
    }
  };