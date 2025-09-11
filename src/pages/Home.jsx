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
      {/* Animated background with particles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Enhanced Navbar */}
        <nav className="glass backdrop-blur-xl border-b border-amber-400/20 px-8 py-6 shadow-2xl">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl glow-gold">
                  <span className="text-2xl font-bold text-slate-900">✨</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">TaskFlow Pro</h1>
                <p className="text-sm text-emerald-300 font-medium">Welcome back, {user.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/create"
                className="px-8 py-4 btn-primary rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl glow-gold flex items-center space-x-2"
              >
                <span>✨</span>
                <span>Create Task</span>
              </Link>
              <Link
                to="/profile"
                className="px-6 py-4 glass-secondary rounded-2xl font-semibold hover:scale-105 transition-all duration-300 border border-emerald-400/30 text-emerald-300 glow-mint"
              >
                <span className="flex items-center space-x-2">
                  <span>👤</span>
                  <span>Profile</span>
                </span>
              </Link>
              <button
                onClick={logout}
                disabled={ispending}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  ispending
                    ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                    : "glass border border-red-400/30 text-red-300 hover:bg-red-500/20 hover:scale-105 glow-purple"
                }`}
              >
                {ispending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 loading-spinner"></div>
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>🚪</span>
                    <span>LogOut</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-20">
          {/* Enhanced Hero Section */}
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent rounded-3xl"></div>
            <h2 className="text-7xl font-bold gradient-text mb-8 float relative z-10">
              Manage Your Universe
            </h2>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10">
              Collaborate with your stellar team, track cosmic progress, and achieve galactic goals with our revolutionary task management platform.
            </p>
            <div className="mt-8 flex justify-center space-x-4 relative z-10">
              <div className="glass px-6 py-3 rounded-full border border-amber-400/30">
                <span className="text-amber-300 font-semibold">{users?.length || 0} Active Members</span>
              </div>
              <div className="glass px-6 py-3 rounded-full border border-emerald-400/30">
                <span className="text-emerald-300 font-semibold">{tasks?.length || 0} Active Tasks</span>
              </div>
            </div>
          </div>

          {/* Enhanced Users Section */}
          <section>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-5xl font-bold gradient-text-secondary mb-4">Stellar Team</h2>
                <p className="text-xl text-slate-400">Your cosmic collaborators</p>
              </div>
              <div className="glass-secondary px-6 py-3 rounded-2xl border border-emerald-400/30">
                <span className="text-emerald-300 font-bold text-lg">{users?.length || 0} Members Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {users &&
                users.map((u, index) => (
                  <Link
                    key={u.uid}
                    to={`/user/${u.uid}`}
                    className="glass rounded-3xl p-8 card-hover group relative overflow-hidden border border-amber-400/20"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative z-10">
                      <div className="flex flex-col items-center space-y-6 mb-6">
                        <div className="relative">
                          <img
                            src={
                              u.photoUrl ||
                              `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.uid}`
                            }
                            alt={u.displayName}
                            className="w-20 h-20 rounded-2xl border-3 border-amber-400/30 shadow-2xl object-cover"
                          />
                          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-slate-900 ${
                            u.online ? "status-online" : "status-offline"
                          }`}></div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-xl text-white group-hover:text-amber-300 transition-colors mb-2">
                            {u.displayName}
                          </h3>
                          <p className="text-sm text-slate-400 font-medium">{u.email}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`px-4 py-2 rounded-xl text-xs font-bold ${
                            u.online 
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                              : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                          }`}>
                            {u.online ? "🟢 Online" : "⚫ Offline"}
                          </span>
                          
                          <div className="glass-secondary px-3 py-1 rounded-lg border border-violet-400/30">
                            <span className="text-xs text-violet-300 font-semibold">
                              {tasks?.filter((t) => t.createdBy === u.uid).length || 0} tasks
                            </span>
                          </div>
                        </div>

                        {/* Enhanced tasks preview */}
                        {tasks?.filter((t) => t.createdBy === u.uid).length > 0 && (
                          <div className="glass-secondary rounded-2xl p-4 border border-emerald-400/20">
                            <p className="text-xs text-emerald-300 font-semibold mb-3">Recent Missions:</p>
                            <div className="space-y-2">
                              {tasks
                                ?.filter((t) => t.createdBy === u.uid)
                                .slice(0, 2)
                                .map((t) => (
                                  <div key={t.id} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                                    <span className="text-xs text-slate-300 truncate font-medium">{t.name}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* Enhanced Tasks Section */}
          <section>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-5xl font-bold gradient-text mb-4">Active Missions</h2>
                <p className="text-xl text-slate-400">Your current objectives</p>
              </div>
              <div className="glass-secondary px-6 py-3 rounded-2xl border border-violet-400/30">
                <span className="text-violet-300 font-bold text-lg">{tasks?.length || 0} Active</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasks &&
                tasks.map((task, index) => (
                  <Link
                    key={task.uid}
                    to={`/task/${task.uid}`}
                    className="glass rounded-3xl p-8 card-hover group relative overflow-hidden border border-emerald-400/20"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg glow-gold"></div>
                        <div className="glass-secondary px-3 py-1 rounded-xl border border-violet-400/30">
                          <span className="text-xs text-violet-300 font-bold">MISSION</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-2xl text-white group-hover:text-amber-300 transition-colors mb-4 leading-tight">
                        {task.name}
                      </h3>
                      
                      <p className="text-slate-400 text-base mb-6 line-clamp-3 leading-relaxed">
                        {task.description || "No mission briefing provided"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-sm shadow-lg">
                            📋
                          </div>
                          <span className="text-sm text-emerald-300 font-semibold">View Mission</span>
                        </div>
                        
                        <div className="glass-secondary px-3 py-1 rounded-lg border border-amber-400/30">
                          <span className="text-xs text-amber-300 font-semibold">
                            {task.comments?.length || 0} updates
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {(!tasks || tasks.length === 0) && (
              <div className="text-center py-20">
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-gold">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-4xl font-bold gradient-text mb-6">Ready for Launch</h3>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                  Your mission control center is ready. Create your first task to begin your cosmic journey!
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center px-12 py-6 btn-primary rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-gold text-xl"
                >
                  <span className="mr-3">🚀</span>
                  <span>Launch Your First Mission</span>
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}