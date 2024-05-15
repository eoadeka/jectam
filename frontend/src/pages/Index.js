import React, { useEffect, useState } from 'react';
import Button from '../components/buttons/Button';
import useAxios from '../hooks/useAxios';
import LoginForm from '../components/forms/auth/login/LoginForm';
import ContainerWithoutNav from '../components/layout/ContainerWithoutNav';
import useAuthContext from '../hooks/useAuthContext';
import { Link, Navigate } from 'react-router-dom';
import Overlay from '../components/layout/Overlay';
import axios from 'axios';
// import background from '../assets/images/doodle.png'
import background from '../assets/images/apms.png'

const Index = () => {
  // const [data] = useAxios("http://localhost:8000/api/hello-world/");
  const [data] = useAxios("https://jectam-backend.onrender.com/api/hello-world/");
  const [user, setUser] = useState(null);

  useEffect(() => {

    const refreshToken = localStorage.getItem('refresh_token');

   if (!refreshToken){
    // window.location.replace("/login");
    setUser(null)
   } else {
    const getUserDetails = async () => {
      try {
        // Retrieve JWT token from local storage (assumed to be stored as 'jwtToken')
        const accessToken = localStorage.getItem('access_token');

        // Send authenticated request to an endpoint that requires authentication
        // const response = await axios.get('http://localhost:8000/accounts/profile/', {
        const response = await axios.get('https://jectam-backend.onrender.com/accounts/profile/', {
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

  const handleLogout = (event) => {
    event.preventDefault();
    // fetch('http://localhost:8000/accounts/logout/', {
    fetch('https://jectam-backend.onrender.com/accounts/logout/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      localStorage.clear();
      window.location.replace('/');
    });
}


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
    <div style={{backgroundImage: `url(${background}) `, backgroundSize: "contain", height : "100vh"}}>
      <ContainerWithoutNav>
        <Overlay>
            {!user ? (
              <header className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"60%", fontSize: "2em"}} ></span>
                <span className="tag tag-1"   style={{width:"40%", textAlign: "right"}}><small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small></span>
              </header>
            ) : (
              <header className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"60%", fontSize: "1em"}} >Hi, {user.first_name} {user.last_name}</span>
                <span className="tag tag-1"   style={{width:"40%", textAlign: "right"}}><small style={{textDecoration:"underline"}} onClick={handleLogout}>Logout</small></span>
              </header>
            )}
            <main>
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
            </main>
         
        </Overlay>
      </ContainerWithoutNav>
    </div>
  );
}

export default Index;