import { Form, NavLink, useActionData } from "react-router-dom";
import { useRegister } from "../hook/useRegister";
import { useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { formError } from "../components/ErrorId";

export async function action({ request }) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

export default function Register() {
  const data = useActionData();
  const { register, isPending } = useRegister();

  useEffect(() => {
    if (data?.name && data?.email && data?.password) {
      register(data.name, data.email, data.password);
    } else if (data) {
      formError(data);
    }
  }, [data]);

  const inputClass =
    "w-full px-8 py-5 glass rounded-2xl text-white placeholder-slate-400 border border-violet-400/30 input-focus transition-all duration-300 text-lg font-medium";

  const buttonClass =
    "w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-2xl text-lg";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
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
        <Form
          method="post"
          className="glass rounded-3xl p-10 shadow-2xl space-y-8 backdrop-blur-xl border border-violet-400/30 glow-purple"
        >
          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-purple">
                <span className="text-4xl font-bold text-white">🚀</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Join TaskFlow Pro</h1>
            <p className="text-xl text-slate-300 font-medium">Create your account to begin the cosmic adventure</p>
          </div>

          {/* Enhanced Inputs */}
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                name="name" 
                placeholder="👤 Full Name" 
                className={inputClass} 
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                placeholder="✉️ Email Address" 
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

          {/* Enhanced Continue / Loading */}
          <button
            type="submit"
            disabled={isPending}
            className={`${buttonClass} btn-accent glow-purple ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <>
                <div className="w-6 h-6 loading-spinner"></div>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Launch Account</span>
                <FaAngleDoubleRight size={24} />
              </>
            )}
          </button>

          {/* Enhanced Link to Login */}
          <div className="text-center pt-6">
            <p className="text-slate-400 text-lg">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-emerald-300 hover:text-emerald-200 font-bold transition-colors text-xl"
              >
                Sign in here
              </NavLink>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}