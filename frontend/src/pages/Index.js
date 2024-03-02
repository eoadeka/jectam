import React from 'react';
import Button from '../components/buttons/Button';
import Container from '../components/layout/Container';
import useAxios from '../hooks/useAxios';
import { Link } from 'react-router-dom';
import Login from './auth/Login';
import LoginForm from '../components/forms/auth/login/LoginForm';

const Index = () => {
  const [data] = useAxios("http://localhost:8000/api/hello-world/");
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
      <Container>
        <h1>Jectam</h1>
        {/* <p>{message}</p> */}
        <p>{data.message}</p>
        <p>Unlock Your Team's Potential with Jectam: Your Agile Project Ally!</p>
        {/* {data ||
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })} */}
        <Button>hey!!</Button><br></br>
        <br></br>

        <Button><Link to={`/login`}>Login</Link></Button>
        <LoginForm />
      </Container>
    </div>
  );
}

export default Index;