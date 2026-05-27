import axiosInstance from "../utils/axiosinstance";

//Create task
export const createTask = async (data) => {
  const responce = await axiosInstance.post("/task", data);
  return responce.data;
};

//get task
export const getTask = async () => {
  const responce = await axiosInstance.get("/task");
  return responce.data;
};

//update task
export const updateTask = async (id,data) => {
  const responce = await axiosInstance.put(`/task/${id}`,data);
  return responce.data;
};

//delete task
export const deleteTask = async (id) => {
   const responce = await axiosInstance.delete(`/task/${id}`);
  return responce.data;
};
