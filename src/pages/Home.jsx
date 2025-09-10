import { useSelector } from "react-redux";
import { useLogOut } from "../hook/LogOut";
import { useCollection } from "../hook/useCollection";
import { Link } from "react-router-dom";

export default function Home() {
  const { ispending, logout } = useLogOut();
  const { user } = useSelector((store) => store.user);
  const { data: users } = useCollection("users");
  const { data: tasks } = useCollection("tasks");

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <nav className="glass backdrop-blur-xl border-b border-white/10 px-8 py-6 shadow-2xl">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
                <p className="text-sm text-gray-300">Welcome back, {user.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/create"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg glow"
              >
                ✨ Create Task
              </Link>
              <Link
                to="/profile"
                className="px-6 py-3 glass rounded-xl font-semibold hover:scale-105 transition-all duration-300 border border-white/20"
              >
                👤 Profile
              </Link>
              <button
                onClick={logout}
                disabled={ispending}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  ispending
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 hover:scale-105"
                }`}
              >
                {ispending ? "Logging out..." : "🚪 LogOut"}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-16">
          {/* Hero Section */}
          <div className="text-center py-12">
            <h2 className="text-6xl font-bold gradient-text mb-6 float">
              Manage Your Tasks
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Collaborate with your team, track progress, and achieve your goals with our beautiful task management platform.
            </p>
          </div>

          {/* Users Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold gradient-text">Team Members</h2>
              <div className="text-sm text-gray-400 glass px-4 py-2 rounded-full">
                {users?.length || 0} active members
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users &&
                users.map((u, index) => (
                  <Link
                    key={u.uid}
                    to={`/user/${u.uid}`}
                    className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <img
                            src={
                              u.photoUrl ||
                              `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.uid}`
                            }
                            alt={u.displayName}
                            className="w-16 h-16 rounded-full border-2 border-white/20 shadow-lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                            u.online ? "bg-green-400" : "bg-gray-400"
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                            {u.displayName}
                          </h3>
                          <p className="text-sm text-gray-400">{u.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.online 
                            ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                            : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                        }`}>
                          {u.online ? "🟢 Online" : "⚫ Offline"}
                        </span>
                        
                        <div className="text-xs text-gray-400">
                          {tasks?.filter((t) => t.createdBy === u.uid).length || 0} tasks
                        </div>
                      </div>

                      {/* Tasks preview */}
                      {tasks?.filter((t) => t.createdBy === u.uid).length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-400 mb-2">Recent tasks:</p>
                          <div className="space-y-1">
                            {tasks
                              ?.filter((t) => t.createdBy === u.uid)
                              .slice(0, 2)
                              .map((t) => (
                                <div key={t.id} className="text-xs text-gray-300 truncate">
                                  • {t.name}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* Tasks Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold gradient-text">Active Tasks</h2>
              <div className="text-sm text-gray-400 glass px-4 py-2 rounded-full">
                {tasks?.length || 0} total tasks
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks &&
                tasks.map((task, index) => (
                  <Link
                    key={task.uid}
                    to={`/task/${task.uid}`}
                    className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="text-xs text-gray-400 glass px-2 py-1 rounded-full">
                          Task
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors mb-3">
                        {task.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {task.description || "No description provided"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs">
                            📋
                          </div>
                          <span className="text-xs text-gray-400">View Details</span>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {task.comments?.length || 0} comments
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {(!tasks || tasks.length === 0) && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  📝
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4">No tasks yet</h3>
                <p className="text-gray-400 mb-8">Create your first task to get started!</p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg glow"
                >
                  ✨ Create Your First Task
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}