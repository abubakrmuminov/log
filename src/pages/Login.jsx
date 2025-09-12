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
    "px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300";

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {!recoveryMode ? (
        <Form
          method="post"
          className="w-full max-w-md bg-neutral-900 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
        >
          {/* Header */}
          <p className="text-center text-gray-300 text-sm mb-4">
            Welcome back!{" "}
            <span className="text-white font-semibold">Sign in to your account</span>
          </p>

          {/* Inputs */}
          <input type="email" name="email" placeholder="Email" className={inputClass} />
          <input type="password" name="password" placeholder="Password" className={inputClass} />

          {/* Forgot / Register */}
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
            <button
              type="button"
              onClick={() => setRecoveryMode(true)}
              className="hover:text-white transition-colors"
            >
              Forgot password?
            </button>
            <NavLink
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              Register
            </NavLink>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className={`${buttonClass} bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 hover:shadow-lg`}
          >
            {isPending ? "Signing in..." : "Continue"}
            <FaAngleDoubleRight size={20} />
          </button>

          {/* Or Separator */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-neutral-700"></div>
            <span className="text-gray-400 text-xs uppercase">or</span>
            <div className="flex-1 h-px bg-neutral-700"></div>
          </div>

          {/* Google Login */}
          <button
  onClick={async () => {
    await googleLogin();
    navigate("/"); // после успешного входа идём на Home
  }}
  disabled={_isPending}
  className={`${buttonClass} bg-white text-black hover:bg-gray-200 shadow-md hover:shadow-lg`}
>
  {_isPending ? "Loading..." : "Sign in with Google"}
  <FcGoogle size={22} />
</button>
        </Form>
      ) : (
        // Password Recovery
        <Form
          method="post"
          className="w-full max-w-md bg-neutral-900 p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
        >
          <p className="text-center text-gray-300 text-sm mb-4">
            Password Recovery
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            name="emailRecovery"
            className={inputClass}
          />

          <button
            type="submit"
            className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-500`}
          >
            Send Recovery Link
          </button>

          <button
            type="button"
            onClick={() => setRecoveryMode(false)}
            className={`${buttonClass} bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white`}
          >
            Back to Login
          </button>
        </Form>
      )}
    </div>
  );
}
