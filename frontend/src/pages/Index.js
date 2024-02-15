import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/buttons/Button';
import Container from '../components/layout/Container';

const Index = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Container>
        <h1>Home</h1>
        <p>{message}</p>
        <Button>hey!!</Button>
      </Container>
    </div>
  );
}

export default Index;