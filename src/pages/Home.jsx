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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 text-warm-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-dark-800 to-warm-950 px-4 sm:px-6 py-4 shadow-2xl border-b border-warm-800/30">
        <div className="text-xl sm:text-2xl font-bold text-warm-200 mb-4 sm:mb-0">
          Welcome, <span className="text-warm-400">{user.displayName}</span>
        </div>
        <ul className="flex flex-wrap gap-2 sm:gap-4">
          <li>
            <button
              onClick={logout}
              disabled={ispending}
              className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                ispending
                  ? "bg-warm-700 text-warm-300 cursor-not-allowed"
                  : "bg-warm-200 text-dark-900 hover:bg-warm-300 hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {ispending ? "Logging out..." : "LogOut"}
            </button>
          </li>
          <li>
            <Link
              to="/create"
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-warm-600 to-warm-700 hover:from-warm-500 hover:to-warm-600 transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 shadow-lg"
            >
              Create Task
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-warm-800 to-dark-700 hover:from-warm-700 hover:to-dark-600 transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 shadow-lg"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12">
        {/* Users Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-warm-300">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {users &&
              users.map((u) => (
                <Link
                  key={u.uid}
                  to={`/user/${u.uid}`}
                  className="bg-gradient-to-br from-dark-800 to-warm-950 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:from-dark-700 hover:to-warm-900 transition-all duration-300 transform hover:scale-105 border border-warm-800/20 hover:border-warm-600/40"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-warm-700/50 flex-shrink-0 mx-auto sm:mx-0 shadow-lg">
                    <img
                      src={
                        u.photoUrl ||
                        `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.uid}`
                      }
                      alt={u.displayName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-warm-200 mb-1">{u.displayName}</h3>
                      <p className="text-xs sm:text-sm text-warm-400 break-all">{u.email}</p>
                    </div>
                    <p
                      className={`text-xs sm:text-sm mt-2 font-medium ${
                        u.online ? "text-green-400 animate-pulse-warm" : "text-red-400"
                      } font-medium`}
                    >
                      {u.online ? "🟢 Online" : "🔴 Offline"}
                    </p>

                    {/* Tasks for this user */}
                    <ul className="mt-2 space-y-1 text-xs text-warm-400 max-h-20 overflow-y-auto">
                      {tasks
                        ?.filter((t) => t.createdBy === u.uid)
                        .map((t) => (
                          <li key={t.id} className="truncate bg-warm-900/30 px-2 py-1 rounded">📝 {t.name}</li>
                        ))}
                    </ul>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Tasks Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-warm-300">All Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tasks &&
              tasks.map((task) => (
                <Link
                  key={task.uid}
                  to={`/task/${task.uid}`}
                  className="bg-gradient-to-br from-dark-800 to-warm-950 rounded-2xl shadow-2xl p-4 sm:p-6 hover:from-dark-700 hover:to-warm-900 transition-all duration-300 transform hover:scale-105 border border-warm-800/20 hover:border-warm-600/40"
                >
                  <h3 className="font-semibold text-base sm:text-lg text-warm-200 mb-2">📋 {task.name}</h3>
                  <p className="text-sm text-gray-400">
                    {task.description || "📝 No description"}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}





