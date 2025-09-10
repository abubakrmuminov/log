import { useSelector } from "react-redux";
import { useLogOut } from "../hook/LogOut";
import { useCollection } from "../hook/useCollection";
import { Link } from "react-router-dom";

export default function Home() {
  const { ispending, logout } = useLogOut();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  const { data: tasks } = useCollection("tasks");
  console.log(tasks);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-neutral-900 px-6 py-4 shadow-md">
        <div className="text-xl font-bold">Home - {user.displayName}</div>
        <ul className="flex gap-4">
          <li>
            {!ispending && (
              <button
                className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
                onClick={logout}
              >
                LogOut
              </button>
            )}
            {ispending && (
              <button
                className="px-4 py-2 rounded-lg bg-gray-600 text-gray-300"
                disabled
              >
                Loading...
              </button>
            )}
          </li>
          <li>
            <Link
              to={"/create"}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Create Task
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Wrapper */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Users List</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.map((user) => (
              <div
                key={user.uid}
                className="bg-neutral-900 rounded-xl shadow-md p-4 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-700">
                  <img
                    src={user.photoUrl}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{user.displayName}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p
                    className={`text-sm ${
                      user.online ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.online ? "online" : "offline"}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {tasks &&
                      tasks.map((task) => (
                        <li key={task.id} className="text-xs text-gray-300">
                          {task.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
