import { Form, NavLink, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaAngleDoubleRight } from "react-icons/fa";

import useLogin from "../hook/useLogin";
import { useResetPassword } from "../hook/useResetPassword";
import { useGoogle } from "../hook/useGoogle";
import { formError } from "../components/ErrorId";

// Обработка данных формы
export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default function Login() {
  const data = useActionData();
  const [recoveryMode, setRecoveryMode] = useState(false);

  const { login, isPending } = useLogin();
  const { resetPassword } = useResetPassword();
  const { googleLogin, _isPending } = useGoogle();

  useEffect(() => {
    if (data?.email && data?.password) {
      login(data.email, data.password);
    } else if (data) {
      formError();
    }

    if (data?.emailRecovery) {
      resetPassword(data.emailRecovery);
    }
  }, [data]);

  const inputClass =
    "w-full px-6 py-4 glass rounded-2xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300";

  const buttonClass =
    "w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {!recoveryMode ? (
          <Form
            method="post"
            className="glass rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-xl border border-white/20"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold">T</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
              <p className="text-gray-300">Sign in to continue to TaskFlow</p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <input 
                type="email" 
                name="email" 
                placeholder="✉️ Email address" 
                className={inputClass} 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="🔒 Password" 
                className={inputClass} 
              />
            </div>

            {/* Forgot / Register */}
            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={() => setRecoveryMode(true)}
                className="text-purple-300 hover:text-purple-200 transition-colors"
              >
                Forgot password?
              </button>
              <NavLink
                to="/register"
                className="glass px-4 py-2 rounded-full text-purple-300 hover:text-white transition-all duration-300 border border-purple-500/30"
              >
                Create account
              </NavLink>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`${buttonClass} bg-gradient-to-r from-purple-500 to-pink-500 text-white glow ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Continue
                  <FaAngleDoubleRight size={20} />
                </>
              )}
            </button>

            {/* Or Separator */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="text-gray-400 text-sm font-medium">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={googleLogin}
              disabled={_isPending}
              type="button"
              className={`${buttonClass} glass border border-white/20 text-white hover:bg-white/10 ${
                _isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {_isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  <FcGoogle size={24} />
                  Continue with Google
                </>
              )}
            </button>
          </Form>
        ) : (
          // Password Recovery
          <Form
            method="post"
            className="glass rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-xl border border-white/20"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🔑</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Reset Password</h1>
              <p className="text-gray-300">Enter your email to receive a reset link</p>
            </div>

            <input
              type="email"
              placeholder="✉️ Enter your email"
              name="emailRecovery"
              className={inputClass}
            />

            <button
              type="submit"
              className={`${buttonClass} bg-gradient-to-r from-blue-500 to-purple-500 text-white glow`}
            >
              Send Recovery Link
            </button>

            <button
              type="button"
              onClick={() => setRecoveryMode(false)}
              className={`${buttonClass} glass border border-white/20 text-gray-300 hover:text-white hover:bg-white/10`}
            >
              ← Back to Login
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}