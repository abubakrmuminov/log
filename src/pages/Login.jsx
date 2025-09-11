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
    "w-full px-8 py-5 glass rounded-2xl text-white placeholder-slate-400 border border-amber-400/30 input-focus transition-all duration-300 text-lg font-medium";

  const buttonClass =
    "w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-2xl text-lg";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
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
        {!recoveryMode ? (
          <Form
            method="post"
            className="glass rounded-3xl p-10 shadow-2xl space-y-8 backdrop-blur-xl border border-amber-400/30 glow-gold"
          >
            {/* Enhanced Header */}
            <div className="text-center mb-10">
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-gold">
                  <span className="text-4xl font-bold text-slate-900">✨</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold gradient-text mb-4">Welcome Back</h1>
              <p className="text-xl text-slate-300 font-medium">Sign in to continue your cosmic journey</p>
            </div>

            {/* Enhanced Inputs */}
            <div className="space-y-6">
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="✉️ Email address" 
                  className={inputClass} 
                />
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="🔒 Password" 
                  className={inputClass} 
                />
              </div>
            </div>

            {/* Enhanced Forgot / Register */}
            <div className="flex justify-between items-center text-base">
              <button
                type="button"
                onClick={() => setRecoveryMode(true)}
                className="text-emerald-300 hover:text-emerald-200 transition-colors font-semibold"
              >
                Forgot password?
              </button>
              <NavLink
                to="/register"
                className="glass-secondary px-6 py-3 rounded-2xl text-violet-300 hover:text-white transition-all duration-300 border border-violet-400/30 font-semibold glow-purple"
              >
                Create account
              </NavLink>
            </div>

            {/* Enhanced Continue Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`${buttonClass} btn-primary glow-gold ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <>
                  <div className="w-6 h-6 loading-spinner"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Continue Journey</span>
                  <FaAngleDoubleRight size={24} />
                </>
              )}
            </button>

            {/* Enhanced Or Separator */}
            <div className="flex items-center gap-6 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
              <span className="text-slate-400 text-lg font-bold px-4">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
            </div>

            {/* Enhanced Google Login */}
            <button
              onClick={googleLogin}
              disabled={_isPending}
              type="button"
              className={`${buttonClass} glass-secondary border border-emerald-400/30 text-white hover:bg-emerald-500/10 glow-mint ${
                _isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {_isPending ? (
                <>
                  <div className="w-6 h-6 loading-spinner"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <FcGoogle size={28} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </Form>
        ) : (
          // Enhanced Password Recovery
          <Form
            method="post"
            className="glass rounded-3xl p-10 shadow-2xl space-y-8 backdrop-blur-xl border border-emerald-400/30 glow-mint"
          >
            <div className="text-center mb-10">
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-mint">
                  <span className="text-4xl">🔑</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-4xl font-bold gradient-text-secondary mb-4">Reset Password</h1>
              <p className="text-xl text-slate-300 font-medium">Enter your email to receive a cosmic reset link</p>
            </div>

            <input
              type="email"
              placeholder="✉️ Enter your email"
              name="emailRecovery"
              className={inputClass.replace('border-amber-400/30', 'border-emerald-400/30')}
            />

            <button
              type="submit"
              className={`${buttonClass} btn-secondary glow-mint`}
            >
              <span>Send Recovery Link</span>
            </button>

            <button
              type="button"
              onClick={() => setRecoveryMode(false)}
              className={`${buttonClass} glass border border-slate-400/30 text-slate-300 hover:text-white hover:bg-slate-500/10`}
            >
              <span>← Back to Login</span>
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}