import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/notifications/';
const BASE_URL = 'https://jectam-backend.onrender.com/notifications/';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Function to fetch all notifications
export const fetchNotifications = async () => {

  const token = localStorage.getItem('access_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.get(`${BASE_URL}notifications/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
        },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAllNotificationsAsRead =  async () => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }
  
    try {
      const accessToken = localStorage.getItem('access_token');

      const response = await axios.patch(`${BASE_URL}mark-all-as-read/`, null,  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
          },  withCredentials: true
      });
      return response.data
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
};