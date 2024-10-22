import { useState, useEffect } from "react";
import axios from 'axios';

const useAxios = (url) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');

    // Check if token exists
    if (!token) {
        // throw new Error('No authentication token found');
        // window.location.replace('/login');
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMDUzOTQwOSwiaWF0IjoxNzEwNDUzMDA5LCJqdGkiOiIxNzc4ZGI5ODdlNWY0MjRkOTUwZGI0NjM0OWMyNzdiOCIsInVzZXJfaWQiOjF9.pktA-G9DCx3ESbSSMiV1v_JNbLeyIS8MuBrwn78A5eY
    const accessToken = localStorage.getItem('access_token');
    
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        // 'Authorization': "JWT " +  localStorage.getItem('access_token'),
      },  withCredentials: true
    })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
  }, [url]);

  return [data];
};

export default useAxios;