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
      showToast("Verification email sent! Check your inbox 📧", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl object-cover mx-auto mb-4"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">👤</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold gradient-text mb-2">{user.displayName}</h1>
            <p className="text-gray-300">{user.email}</p>
          </div>

          {/* Email Verification Status */}
          <div className="space-y-4 mb-8">
            <div className="glass rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    user.emailVerified ? "bg-green-400" : "bg-red-400"
                  }`}></div>
                  <span className="text-sm font-medium">Email Status</span>
                </div>
                <span className={`text-sm font-semibold ${
                  user.emailVerified ? "text-green-400" : "text-red-400"
                }`}>
                  {user.emailVerified ? "✅ Verified" : "❌ Not Verified"}
                </span>
              </div>
            </div>

            {!user.emailVerified && (
              <button
                onClick={sentVerificationEmail}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg glow"
              >
                📧 Send Verification Email
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full py-4 glass rounded-2xl font-semibold text-center block hover:bg-white/10 transition-all duration-300 border border-white/20"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 transform ${
          toast.type === "success"
            ? "bg-green-500/20 border-green-500/30 text-green-300"
            : "bg-red-500/20 border-red-500/30 text-red-300"
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              toast.type === "success" ? "bg-green-400" : "bg-red-400"
            }`}></div>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}