import { useCollection } from "../hook/useCollection";
import { useParams, Link } from "react-router-dom";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  if (!data) {
    return (
      <div className="min-h-screen text-white p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading user information...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen text-white p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <p className="text-gray-400 mb-8">The user you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const user = data[0];
  const avatar = user.photoURL
    ? user.photoURL
    : `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.uid}`;

  return (
    <div className="min-h-screen text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to Team</span>
        </Link>

        {/* User Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/20 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-6">
            <img
              src={avatar}
              alt={user.displayName}
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl object-cover mx-auto"
            />
            <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${
              user.online ? "bg-green-400" : "bg-gray-400"
            } shadow-lg`}></div>
          </div>

          {/* User Info */}
          <h1 className="text-3xl font-bold gradient-text mb-2">{user.displayName}</h1>
          <p className="text-gray-300 mb-6">{user.email}</p>

          {/* Status */}
          <div className="space-y-4">
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${
              user.online 
                ? "bg-green-500/20 border border-green-500/30 text-green-300" 
                : "bg-gray-500/20 border border-gray-500/30 text-gray-300"
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                user.online ? "bg-green-400" : "bg-gray-400"
              }`}></div>
              <span className="font-semibold">
                {user.online ? "🟢 Online" : "⚫ Offline"}
              </span>
            </div>

            {/* Additional Info */}
            <div className="glass rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Member since</span>
                <span className="text-white">Recently joined</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">User ID</span>
                <span className="text-white font-mono text-xs">{user.uid.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;