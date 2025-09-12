import { useNavigate } from "react-router-dom";
import { useCollection } from "../hook/useCollection";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

function CreateTask() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const options = data?.map((u) => ({
      value: u.uid,
      label: u.displayName,
      photoURL: u.photoUrl,
    }));
    setUserOptions(options || []);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const name = formdata.get("title");
    const description = formdata.get("description");
    const dueto = formdata.get("due-to");

    // Отмеченные пользователи
    const assignedUsers = e.target.querySelector('[name="Users"]')
      ? userOptions.filter((u) => u.selected)
      : [];

    const task = {
      name,
      description,
      dueto,
      createdBy: user.uid, // ключевой момент
      assignedUsers,       // кому назначена таска
      comments: [],
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "tasks"), task); // исправлено на "tasks"
      alert("Task added!");
      navigate("/");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Error adding task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-neutral-900 p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            id="title"
            name="title"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter task description"
            rows={4}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>
        </div>

        {/* Due date */}
        <div className="flex flex-col">
          <label htmlFor="due-to" className="mb-2 text-sm font-medium text-gray-300">
            Due to
          </label>
          <input
            type="date"
            id="due-to"
            name="due-to"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Users */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-300">Assign Users</label>
          <Select
            isMulti
            name="Users"
            options={userOptions}
            className="text-black"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "#171717", borderColor: "#404040", color: "white" }),
              menu: (base) => ({ ...base, backgroundColor: "#171717", color: "white" }),
              multiValue: (base) => ({ ...base, backgroundColor: "#262626", color: "white" }),
              singleValue: (base) => ({ ...base, color: "white" }),
              input: (base) => ({ ...base, color: "white" }),
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;