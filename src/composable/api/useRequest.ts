import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

request.interceptors.response.use(
  res=>{
    if(res && res.data){
      // if(res.data.success){
      //   if(res.data.data) return res.data.data
      //   else return res.data
      // }
      // else {
      //   return Promise.reject(res.data.error);
      // };
      return res.data
    }
    else {
      return Promise.reject("Error response");
    };
  },
  err=>{
    return Promise.reject(err.error)
  }
)
  
export default request;