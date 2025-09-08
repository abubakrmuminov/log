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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="glass rounded-lg p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-medium text-lg">{user.displayName?.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-medium text-white">Welcome back</h2>
                <p className="text-gray-500 text-sm">{user.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/create" 
                className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-md text-sm font-medium btn-glow transition-all duration-200"
              >
                Create Task
              </Link>
              {!ispending ? (
                <button 
                  onClick={logout}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-md text-sm font-medium border border-gray-800 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <button 
                  disabled 
                  className="bg-gray-900 text-gray-500 px-5 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Users Section */}
        <div className="glass rounded-lg p-6 animate-slide-up">
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Team Members</h2>
            <p className="text-gray-500 text-sm">Manage your team and track their activity</p>
          </div>

          <div className="grid gap-6">
            {data && data.map((user, index) => (
              <div 
                key={user.uid} 
                className="bg-gray-950 hover:bg-gray-900 rounded-lg p-4 border border-gray-900 hover:border-gray-800 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={user.photoUrl} 
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full border border-gray-800"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-black ${
                        user.online ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium text-white">{user.displayName}</h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs mt-1 ${
                        user.online 
                          ? 'bg-green-950 text-green-400 border border-green-900' 
                          : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}>
                        {user.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-2">Tasks</div>
                    {tasks && (
                      <div className="space-y-1">
                        {tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="text-xs text-gray-300 bg-gray-900 px-2 py-1 rounded border border-gray-800">
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
