import axios from 'axios';

const BASE_URL = 'http://localhost:8000/projects/';

// Function to fetch all document types
export const fetchTemplateTypes = async () => {
    const token = localStorage.getItem('refresh_token');
  
    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
  
    try {
      const response = await axios.get(`${BASE_URL}template-types/`, {
        headers: {
          'Authorization': "JWT " + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          'accept': 'application/json'
          },  withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching document types:', error);
      throw error;
    }
  };

export const fetchDocumentTypes = async () => {
    const token = localStorage.getItem('refresh_token');
  
    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
  
    try {
      const response = await axios.get(`${BASE_URL}projects/documents`, {
        headers: {
          'Authorization': "JWT " + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          'accept': 'application/json'
          },  withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching document types:', error);
      throw error;
    }
};

export const fetchDocuments = async () => {
  const token = localStorage.getItem('refresh_token');

  // Check if token exists
  if (!token) {
    // throw new Error('No authentication token found');
    window.location.replace('/login');
  }

  try {
    const response = await axios.get(`${BASE_URL}documents/`, {
      headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
        },  withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching document types:', error);
    throw error;
  }
};

export const automateDocument = async (projectId, type) =>  {
    const today = new Date();
    const formattedDate = today.toISOString();
    const token = localStorage.getItem('refresh_token');

    // Check if token exists
    if (!token) {
      // throw new Error('No authentication token found');
      window.location.replace('/login');
    }
    
    try {
      const accessToken = localStorage.getItem('access_token');
        const response = await axios.post(`${BASE_URL}automate-document/`, {
            projectDetails: {
              project: projectId,  // Sample project details
              // date: formattedDate,
              file_type: type // Specify the JSON file name for the Business Case document
            },
            fileName: type // Specify the JSON file name for the Business Case document
        }, 
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