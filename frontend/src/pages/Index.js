import React from 'react';
import Button from '../components/buttons/Button';
import useAxios from '../hooks/useAxios';
import LoginForm from '../components/forms/auth/login/LoginForm';
import ContainerWithoutNav from '../components/layout/ContainerWithoutNav';
import useAuthContext from '../hooks/useAuthContext';
import { Link, Navigate } from 'react-router-dom';
import Overlay from '../components/layout/Overlay';

const Index = () => {
  const [data] = useAxios("http://localhost:8000/api/hello-world/");
  const user = useAuthContext();
  
  if (!user.token) return <Navigate to="/" />;

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
          {!user.token ? (
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