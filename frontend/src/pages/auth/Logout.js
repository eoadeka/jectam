import React, { useEffect } from 'react';
import axios from "axios";

const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const {data} = await  
          axios.post(
            'http://localhost:8000/accounts/logout/', 
          // { refresh_token:localStorage.getItem('refresh_token')} ,
          { token:localStorage.getItem('token')} ,
          {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },  
          withCredentials: true});
        console.log('logout', data)
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/login'
      } catch (e) {
          console.log('logout not working', e)
        }
        })();
    }, []);
  return (
    <></>
  );
}

export default Logout;