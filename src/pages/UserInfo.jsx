import { useCollection } from "../hook/useCollection";
import { useParams, Link } from "react-router-dom";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  if (!data) {
    return (
      <div className="min-h-screen text-white p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 loading-spinner mx-auto mb-6"></div>
          <p className="text-2xl font-bold gradient-text">Loading crew member information...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen text-white p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-400/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-6xl">❌</span>
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-6">Crew Member Not Found</h2>
          <p className="text-xl text-slate-400 mb-10">The crew member you're looking for is not in our cosmic database.</p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 btn-primary rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-gold text-lg"
          >
            <span className="mr-3">←</span>
            <span>Back to Mission Control</span>
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
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
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

      <div className="relative z-10 w-full max-w-lg">
        {/* Enhanced Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-3 text-emerald-300 hover:text-emerald-200 transition-colors mb-10 font-bold text-lg"
        >
          <span className="text-2xl">←</span>
          <span>Back to Stellar Team</span>
        </Link>

        {/* Enhanced User Card */}
        <div className="glass rounded-3xl p-10 shadow-2xl backdrop-blur-xl border border-emerald-400/30 text-center glow-mint">
          {/* Enhanced Avatar */}
          <div className="relative inline-block mb-8">
            <img
              src={avatar}
              alt={user.displayName}
              className="w-40 h-40 rounded-3xl border-4 border-emerald-400/30 shadow-2xl object-cover mx-auto glow-mint"
            />
            <div className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl border-4 border-slate-900 shadow-2xl ${
              user.online ? "status-online" : "bg-gradient-to-r from-slate-400 to-slate-500"
            }`}></div>
          </div>

          {/* Enhanced User Info */}
          <h1 className="text-4xl font-bold gradient-text-secondary mb-4">{user.displayName}</h1>
          <p className="text-xl text-slate-300 mb-8 font-medium">{user.email}</p>

          {/* Enhanced Status */}
          <div className="space-y-6">
            <div className={`inline-flex items-center space-x-4 px-8 py-4 rounded-2xl font-bold text-lg ${
              user.online 
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 glow-mint" 
                : "bg-slate-500/20 border border-slate-500/30 text-slate-400"
            }`}>
              <div className={`w-4 h-4 rounded-full ${
                user.online ? "status-online" : "bg-gradient-to-r from-slate-400 to-slate-500"
              }`}></div>
              <span>
                {user.online ? "🟢 Online & Active" : "⚫ Offline"}
              </span>
            </div>

            {/* Enhanced Additional Info */}
            <div className="glass-secondary rounded-3xl p-6 border border-emerald-400/20 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-slate-400 font-semibold">Crew Member Since</span>
                <span className="text-white font-bold">Recently Joined</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-slate-400 font-semibold">Cosmic ID</span>
                <span className="text-white font-mono text-base bg-slate-700/50 px-3 py-1 rounded-lg">
                  {user.uid.slice(0, 8)}...
                </span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-slate-400 font-semibold">Mission Status</span>
                <span className="text-emerald-300 font-bold">Active Crew</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;