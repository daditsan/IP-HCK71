import axios from "axios";

const instance = axios.create({
  
    // baseURL: "https://phase2-aio.vercel.app/"
    baseURL: "http://localhost:3002/"
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance;