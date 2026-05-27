import { useState, useEffect } from "react";
import {
  createTask,
  getTask,
  deleteTask,
  updateTask,
} from "../services/manageTaskService";
import { toast } from "react-toastify";

export function TaskManagement() {
  const [formData, setTask] = useState({
    title: "",
    status: "active",
  });
  const [tasksList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({
      ...formData,
      [e.target.name]: e.target.value,
      ["status"]: "active",
    });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editId) {
        // UPDATE
        await updateTask(editId, formData);
        setEditId(null);
        setTask({
          title: "",
        });
        toast.success("Task Updated Successfully");
      } else {
        const data = await createTask(formData);

        setTask({
          title: "",
        });
        toast.success("Task Created Successfully");
      }
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //get task list
  const fetchTask = async () => {
    try {
      setLoading(true);
      const responce = await getTask();

      setTaskList(responce.data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // delete task
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTask(id);
      toast.success("Task Deleted Successfully");
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally {
      setLoading(false);
    }
  };
  //update task
  const handleEdit = (task) => {
    setTask(task);
    setEditId(task._id);
  };

  //update status
  const handleStatus = async (e, id) => {
    const status = e.target.checked ? "completed" : "active";
    const data = {
      status: status,
    };

    try {
      setLoading(true);
      await updateTask(id, data);
      toast.success("Status Changed Successfully");
      fetchTask();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally {
      setLoading(false);
    }
  };

  //status filters
  const filteredTasks = tasksList.filter((task) => {
    if (filter === "active") {
      return task.status === "active";
    } else if (filter === "completed") {
      return task.status == "completed";
    }
    return true;
  });

  //active task count
  const activeTaskCount = tasksList.filter(
    (task) => task.status === "active",
  ).length;

  return (
    <div className="min-h-screen flex  bg-[#F3F4F6]">
      {/* left sidebar */}
      <div className="w-16 bg-white "></div>

      {/* main-content */}
      <div className="main  flex-1 relative flex flex-col ">
        <div className={`  flex justify-end p-4 mt-2  `}>
          <img
            src="images/moon.svg "
            className={`${tasksList.length === 0 ? "block" : "invisible"}`}
          />
        </div>

        <div className=" main-centent  mt-4 ">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="font-[Lato] font-[700] text-[48px] text-[#333333] mb-15">
              {" "}
              My Tasks
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 mb-8 mt-14m">
                <input
                  type="text"
                  placeholder="Type your task here.."
                  className="bg-white text-[24px] text-[#A9A9A9] shadow-[0_2px_4px_0px_#00000040] px-4  rounded-[12px] w-[519px] py-3"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <button className="bg-black text-white px-5 rounded-md font-[700] text-[24px] font-[Lato] cursor-pointer">
                  {editId ? "Update" : " + Add "}
                </button>
              </div>
            </form>
          </div>
          <div
            className={`flex flex-1 justify-center gap-5 mt-4 ${tasksList.length === 0 ? "block" : "hidden"}`}
          >
            <img src="images/selfie.png" className="" />
            <p className="text-[#333333] mt-4 flex items-center font-[lato] text-[24px] leading-[100%] tracking-tight italic">
              Empty as my motivation on Monday 😅.
              <br />
              Let’s start adding stuff!
            </p>
          </div>

          {/* To do list  */}
          <div
            className={`flex  flex-col  items-center justify-center ${tasksList.length === 0 ? "hidden" : "block"}`}
          >
            <div className="max-w-[640px] w-full">
              {/* BUTTONS */}
              <div className="flex justify-between w-full p-2">
                <div className="flex gap-1 font-[lato] text-[20px] text-[#6A7282]">
                  <a
                    role="button"
                    className={`${
                      filter === "all" ? " text-black" : "cursor-pointer"
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </a>
                  <span>|</span>
                  <a
                    role="button"
                    className={`${
                      filter === "active" ? " text-black" : "cursor-pointer"
                    }`}
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </a>
                  <span>|</span>
                  <a
                    role="button"
                    className={`${
                      filter === "completed" ? " text-black" : "cursor-pointer"
                    }`}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </a>
                </div>
                <p className="text-[20px] text-[#6A7282] font-[Lato]">
                  {activeTaskCount} tasks left
                </p>
              </div>
              {/* list */}
              {filteredTasks.map((task) => (
                <div className="flex items-center justify-between bg-white p-4 rounded-[12px] shadow-[0_2px_4px_0px_#00000040] mb-7">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-black border-[2px] cursor-pointer"
                      checked={task.status === "completed"}
                      onChange={(e) => handleStatus(e, task._id)}
                    />
                    <p
                      className={`${task.status === "completed" ? "line-through text-[#6A7282]" : "text-[24px] font-[lato] text-[#333333]"}`}
                    >
                      {task?.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleEdit(task)}
                    >
                      <img src="images/edit.png" className="w-5 h-5" />
                    </button>

                    {/* Delete Icon */}
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(task._id)}
                    >
                      <img src="images/delete.png" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* footer */}
        <footer className="mt-30 py-5 text-center text-[20px] font-[lato]  text-[#6A7282] py-4">
          {" "}
          © 2025{" "}
        </footer>
      </div>
      {/* loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
