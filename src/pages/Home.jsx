import { useSelector } from "react-redux";
import { useLogOut } from "../hook/LogOut";
import { useCollection } from "../hook/useCollection";
import { Link } from "react-router-dom";

export default function Home() {
  const { ispending, logout } = useLogOut();
  const { user } = useSelector((store) => store.user);
  const { data: users } = useCollection("users");
  const { data: tasks } = useCollection("tasks");
console.log("TASKS:", tasks)
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-neutral-900 px-6 py-4 shadow-lg">
        <div className="text-2xl font-bold">Welcome, {user.displayName}</div>
        <ul className="flex gap-4">
          <li>
            <button
              onClick={logout}
              disabled={ispending}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                ispending
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {ispending ? "Logging out..." : "LogOut"}
            </button>
          </li>
          <li>
            <Link
              to="/create"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
            >
              Create Task
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-medium"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-12">
        {/* Users Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users &&
              users.map((u) => (
                <Link
                  key={u.uid}
                  to={`/user/${u.uid}`}
                  className="bg-neutral-900 rounded-2xl shadow-xl p-4 flex gap-4 hover:bg-neutral-800 transition transform hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-700 flex-shrink-0">
                    <img
                      src={
                        u.photoUrl ||
                        `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.uid}`
                      }
                      alt={u.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{u.displayName}</h3>
                      <p className="text-sm text-gray-400">{u.email}</p>
                    </div>
                    <p
                      className={`text-sm mt-2 ${
                        u.online ? "text-green-400" : "text-red-400"
                      } font-medium`}
                    >
                      {u.online ? "Online" : "Offline"}
                    </p>

                    {/* Tasks for this user */}
                    <ul className="mt-2 space-y-1 text-xs text-gray-300">
                      {tasks
                        ?.filter((t) => t.createdBy === u.uid)
                        .map((t) => (
                          <li key={t.id}>{t.name}</li>
                        ))}
                    </ul>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Tasks Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">All Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks &&
              tasks.map((task) => (
                <Link
                  key={task.uid}
                  to={`/task/${task.uid}`}
                  className="bg-neutral-900 rounded-2xl shadow-xl p-4 hover:bg-neutral-800 transition transform hover:scale-105"
                >
                  <h3 className="font-semibold text-lg">{task.name}</h3>
                  <p className="text-sm text-gray-400">
                    {task.description || "No description"}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}





