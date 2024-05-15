import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/projects/';
const BASE_URL = 'https://jectam-backend.onrender.com/projects/';


export const predictMethodology = async (project_description) =>  {

    const token = localStorage.getItem('refresh_token');

    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
    
    try {
      const accessToken = localStorage.getItem('access_token');
        const response = await axios.post(`${BASE_URL}predict-method/`, project_description, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },  withCredentials: true
        });
        console.log(response.data)
        // return response.data;

        // Extract the documentId from the response
        const documentId = response.data.document_id;

        // After the POST request is successful, you can make a GET request to fetch the generated document
        const documentResponse = await axios.get(`${BASE_URL}documents/${documentId}/`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'accept': 'application/json'
          },
          withCredentials: true
        });

        console.log(documentResponse.data);

        return documentResponse.data;
    } catch (error) {
      console.error('Error automating document:', error);
      throw error;
    }
}