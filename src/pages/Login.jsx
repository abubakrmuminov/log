import { Form, NavLink, useActionData } from "react-router-dom";
import useLogin from "../hook/useLogin";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { FcGoogle } from "react-icons/fc";
import { FaAngleDoubleRight, FaGithub } from "react-icons/fa";
import { useResetPassword } from "../hook/useResetPassword";

// 🔥 action shu yerda
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Login() {
  const data = useActionData();
  const { login, isPending } = useLogin();
  const { resetPassword } = useResetPassword();
  const [form, setForm] = useState(false);

  useEffect(() => {
    if (data?.email && data?.password) {
      login(data.email, data.password);
    } else {
      data ? formError() : false;
    }

    if (data?.emailRecovery) {
      resetPassword(data.emailRecovery);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center p-6">
      {!form && (
        <div className="glass rounded-2xl p-8 w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>

          <Form method="post" className="space-y-6">
            <div>
              <input 
                type="email" 
                placeholder="Email address" 
                name="email" 
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <button
              type="button"
              onClick={() => setForm(!form)}
              className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
            >
              Forgot your password?
            </button>

            <div className="space-y-3">
              <button 
                type="button"
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 px-4 py-3 rounded-xl font-medium transition-all duration-300 btn-glow"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

              <button 
                type="button"
                className="w-full flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 btn-glow"
              >
                <FaGithub size={20} />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {!isPending ? (
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium btn-glow transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
                <FaAngleDoubleRight size={16} />
              </button>
            ) : (
              <button 
                disabled
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl font-medium opacity-50 cursor-not-allowed"
              >
                Loading...
              </button>
            )}
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <NavLink to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      )}

      {form && (
        <div className="glass rounded-2xl p-8 w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400">Enter your email to receive reset instructions</p>
          </div>

          <Form method="post" className="space-y-6">
            <div>
              <input 
                type="email" 
                placeholder="Email address" 
                name="emailRecovery" 
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium btn-glow transition-all duration-300"
            >
              Send Reset Link
            </button>
            
            <button
              type="button"
              onClick={() => setForm(!form)}
              className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
            >
              Back to Sign In
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}
