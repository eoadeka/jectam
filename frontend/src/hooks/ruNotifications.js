import axios from 'axios';

const BASE_URL = 'http://localhost:8000/notifications/';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Function to fetch all notifications
export const fetchNotifications = async () => {

  try {
    const response = await axios.get(`${BASE_URL}notifications/`, {
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

export const markAllNotificationsAsRead =  async () => {

    try {
        const response = await axios.patch(`${BASE_URL}mark-all-as-read/`);
        return response.data
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
};