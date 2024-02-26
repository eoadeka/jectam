import { useState, useEffect } from "react";
import axios from 'axios';

const useAxios = (url) => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get(url)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
  }, [url]);

  return [data];
};

export default useAxios;