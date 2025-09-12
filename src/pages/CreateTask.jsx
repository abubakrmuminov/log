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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gradient-to-br from-dark-800 to-warm-950 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 sm:space-y-6 border border-warm-800/30 backdrop-blur-sm"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 text-sm font-medium text-warm-300">
            Title
          </label>
          <input
            type="text"
            placeholder="📝 Enter task title"
            id="title"
            name="title"
            className="px-4 py-3 rounded-lg bg-dark-800/80 text-warm-100 placeholder-warm-400 border border-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-sm font-medium text-warm-300">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="📄 Enter task description"
            rows={4}
            className="px-4 py-3 rounded-lg bg-dark-800/80 text-warm-100 placeholder-warm-400 border border-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all duration-300 resize-none"
          ></textarea>
        </div>

        {/* Due date */}
        <div className="flex flex-col">
          <label htmlFor="due-to" className="mb-2 text-sm font-medium text-warm-300">
            Due to
          </label>
          <input
            type="date"
            id="due-to"
            name="due-to"
            className="px-4 py-3 rounded-lg bg-dark-800/80 text-warm-100 border border-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all duration-300"
          />
        </div>

        {/* Users */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-warm-300">👥 Assign Users</label>
          <Select
            isMulti
            name="Users"
            options={userOptions}
            className="text-dark-900"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({ 
                ...base, 
                backgroundColor: "rgba(42, 31, 31, 0.8)", 
                borderColor: "rgba(205, 133, 63, 0.5)", 
                color: "#f2e8e5",
                borderRadius: "0.5rem",
                padding: "0.25rem"
              }),
              menu: (base) => ({ ...base, backgroundColor: "#2a1f1f", color: "#f2e8e5", borderRadius: "0.5rem" }),
              multiValue: (base) => ({ ...base, backgroundColor: "#5a4040", color: "#f2e8e5", borderRadius: "0.25rem" }),
              multiValueLabel: (base) => ({ ...base, color: "#f2e8e5" }),
              singleValue: (base) => ({ ...base, color: "#f2e8e5" }),
              input: (base) => ({ ...base, color: "#f2e8e5" }),
              placeholder: (base) => ({ ...base, color: "#bfa094" }),
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 font-semibold rounded-lg hover:from-warm-500 hover:to-warm-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          ✨ Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;