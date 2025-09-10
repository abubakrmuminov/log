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
        <Form
          method="post"
          className="glass rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-xl border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold">T</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Join TaskFlow</h1>
            <p className="text-gray-300">Create your account to get started</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input 
              type="text" 
              name="name" 
              placeholder="👤 Full Name" 
              className={inputClass} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="✉️ Email Address" 
              className={inputClass} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="🔒 Password" 
              className={inputClass} 
            />
          </div>

          {/* Continue / Loading */}
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
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <FaAngleDoubleRight size={20} />
              </>
            )}
          </button>

          {/* Link to Login */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
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