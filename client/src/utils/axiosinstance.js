import axios from "axios";
 const axiosInstance=axios.create({
    baseURL:"https://task-management-2bt4.onrender.com/api/"
 });
export default axiosInstance;