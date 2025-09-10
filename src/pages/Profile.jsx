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
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-neutral-600 shadow-md object-cover"
        />
        <h3 className="text-xl font-semibold">{user.displayName}</h3>

        <div className="text-center w-full">
          <h3 className="text-sm text-neutral-400">{user.email}</h3>
          <div className="mt-3">
            {user.emailVerified ? (
              <p className="text-green-400">Email Verified 👌</p>
            ) : (
              <div className="space-y-2">
                <p className="text-red-400">Email Not Verified</p>
                <button
                  onClick={sentVerificationEmail}
                  className="w-full bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  Send verification code
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
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
