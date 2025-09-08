import { useSelector } from "react-redux"
import { useLogOut } from "../hook/LogOut"
import { useCollection } from "../hook/useCollection"
import { Link } from "react-router-dom"


export default function Home() {
  const { ispending, logout } = useLogOut()
  const { user } = useSelector((store) => store.user)
  const { data } = useCollection("users")
  const { data : tasks } = useCollection("tasks")
  console.log(tasks);
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="glass rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">{user.displayName?.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                <p className="text-gray-400">{user.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium btn-glow transition-all duration-300"
              >
                Create Task
              </Link>
              {!ispending ? (
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium btn-glow transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button 
                  disabled 
                  className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium opacity-50 cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Users Section */}
        <div className="glass rounded-2xl p-8 animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Team Members</h2>
            <p className="text-gray-400">Manage your team and track their activity</p>
          </div>

          <div className="grid gap-6">
            {data && data.map((user, index) => (
              <div 
                key={user.uid} 
                className="bg-dark-800 hover:bg-dark-700 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={user.photoUrl} 
                        alt={user.displayName}
                        className="w-16 h-16 rounded-full border-2 border-gray-700"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-dark-800 ${
                        user.online ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white">{user.displayName}</h3>
                      <p className="text-gray-400">{user.email}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        user.online 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-gray-900 text-gray-300'
                      }`}>
                        {user.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-2">Tasks</div>
                    {tasks && (
                      <div className="space-y-1">
                        {tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="text-sm text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                            {task.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
