import React, { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';
import useAxios from '../hooks/useAxios';
import LoginForm from '../components/forms/auth/login/LoginForm';
import ContainerWithoutNav from '../components/layout/ContainerWithoutNav';
import useAuthContext from '../hooks/useAuthContext';
import { Link, Navigate } from 'react-router-dom';
import Overlay from '../components/layout/Overlay';
import axios from 'axios';


const Index = () => {
  const [data] = useAxios("http://localhost:8000/api/hello-world/");
  const [user, setUser] = useState(null);

  useEffect(() => {

    const refreshToken = localStorage.getItem('refresh_token');

   if (!refreshToken){
    window.location.replace("/login");
   } else {
    const getUserDetails = async () => {
      try {
        // Retrieve JWT token from local storage (assumed to be stored as 'jwtToken')
        const accessToken = localStorage.getItem('access_token');

        // Send authenticated request to an endpoint that requires authentication
        const response = await axios.get('http://localhost:8000/accounts/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },  withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }
  }, []);


  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/hello-world/')
  //     .then(response => {
  //       setMessage(response.data.message);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <ContainerWithoutNav>
        <Overlay>
          <h1>Jectam</h1>
          {/* <p>{message}</p> */}
          <p>Unlock Your Team's Potential with Jectam: Your Project Ally!</p>
          <p>{data.message}</p>
          {/* {data ||
          data.map((item) => {
            return <p key={item.id}>{item.title}</p>;
          })} */}
          {/* <Button>hey!!</Button><br></br> */}
          <br></br>

          {/* <Button><Link to={`/login`}>Login</Link></Button> */}
          {!user ? (
            <LoginForm />
          ) : (
            <small> <Link to={`/dashboard`}>Navigate to dashboard</Link></small>
          )}
        </Overlay>
      </ContainerWithoutNav>
    </div>
  );
}

export default Index;