import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((store) => store.user);
  const [toast, setToast] = useState(null);

  const sentVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      showToast("Verification email sent! Check your cosmic inbox 📧", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
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
        <div className="glass rounded-3xl p-10 shadow-2xl backdrop-blur-xl border border-emerald-400/30 glow-mint">
          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-8">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-36 h-36 rounded-3xl border-4 border-emerald-400/30 shadow-2xl object-cover mx-auto glow-mint"
              />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl glow-mint">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold gradient-text-secondary mb-4">{user.displayName}</h1>
            <p className="text-xl text-slate-300 font-medium">{user.email}</p>
          </div>

          {/* Enhanced Email Verification Status */}
          <div className="space-y-6 mb-10">
            <div className="glass-secondary rounded-3xl p-6 border border-emerald-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full shadow-lg ${
                    user.emailVerified ? "status-online" : "bg-gradient-to-r from-red-400 to-red-500"
                  }`}></div>
                  <span className="text-lg font-bold text-emerald-300">Email Status</span>
                </div>
                <span className={`text-lg font-bold px-4 py-2 rounded-xl ${
                  user.emailVerified 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {user.emailVerified ? "✅ Verified" : "❌ Not Verified"}
                </span>
              </div>
            </div>

            {!user.emailVerified && (
              <button
                onClick={sentVerificationEmail}
                className="w-full py-5 btn-secondary rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-mint text-lg"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>📧</span>
                  <span>Send Verification Email</span>
                </span>
              </button>
            )}
          </div>

          {/* Enhanced Navigation */}
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full py-5 glass-secondary rounded-2xl font-bold text-center block hover:bg-emerald-500/10 transition-all duration-300 border border-emerald-400/30 text-lg text-emerald-300 hover:text-white"
            >
              <span className="flex items-center justify-center space-x-3">
                <span>🏠</span>
                <span>Back to Mission Control</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Toast Notification */}
      {toast && (
        <div className={`notification fixed top-8 right-8 px-8 py-6 rounded-3xl shadow-2xl backdrop-blur-xl transition-all duration-500 transform max-w-md ${
          toast.type === "success"
            ? "border-emerald-400/30 text-emerald-300"
            : "border-red-400/30 text-red-300"
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${
              toast.type === "success" ? "status-online" : "bg-gradient-to-r from-red-400 to-red-500"
            }`}></div>
            <span className="font-bold text-lg">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}