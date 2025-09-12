import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useState } from "react";

export default function Profile() {
  const { user } = useSelector((store) => store.user);
  const [toast, setToast] = useState(null);

  const sentVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      showToast("Verification email sent!", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // исчезнет через 3 сек
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 text-warm-100 flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md bg-gradient-to-br from-dark-800 to-warm-950 border border-warm-800/30 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center space-y-4 sm:space-y-6 backdrop-blur-sm">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-3 border-warm-700/50 shadow-2xl object-cover hover:scale-110 transition-transform duration-300"
        />
        <h3 className="text-xl sm:text-2xl font-semibold text-warm-200">{user.displayName}</h3>

        <div className="text-center w-full">
          <h3 className="text-sm sm:text-base text-warm-400 break-all">{user.email}</h3>
          <div className="mt-3">
            {user.emailVerified ? (
              <p className="text-green-400 font-medium">✅ Email Verified</p>
            ) : (
              <div className="space-y-3">
                <p className="text-red-400 font-medium">❌ Email Not Verified</p>
                <button
                  onClick={sentVerificationEmail}
                  className="w-full bg-gradient-to-r from-warm-600 to-warm-700 hover:from-warm-500 hover:to-warm-600 text-warm-100 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                >
                  📧 Send verification code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-600 text-white shadow-green-600/25"
              : "bg-red-600 text-white shadow-red-600/25"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
