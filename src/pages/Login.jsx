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
    "px-5 py-3 rounded-xl bg-dark-800/80 text-warm-100 placeholder-warm-400 border border-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all duration-300 backdrop-blur-sm";

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 px-4 py-8">
      {!recoveryMode ? (
        <Form
          method="post"
          className="w-full max-w-md bg-gradient-to-br from-dark-800 to-warm-950 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col gap-4 sm:gap-6 border border-warm-800/30 backdrop-blur-sm"
        >
          {/* Header */}
          <p className="text-center text-warm-300 text-sm mb-4">
            Welcome back!{" "}
            <span className="text-warm-100 font-semibold">Sign in to your account</span>
          </p>

          {/* Inputs */}
          <input type="email" name="email" placeholder="📧 Email" className={inputClass} />
          <input type="password" name="password" placeholder="🔒 Password" className={inputClass} />

          {/* Forgot / Register */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-warm-400 mb-2 gap-2">
            <button
              type="button"
              onClick={() => setRecoveryMode(true)}
              className="hover:text-warm-200 transition-colors underline"
            >
              Forgot password?
            </button>
            <NavLink
              to="/register"
              className="bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Register
            </NavLink>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className={`${buttonClass} bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 hover:scale-105 hover:shadow-lg hover:from-warm-500 hover:to-warm-600`}
          >
            {isPending ? "Signing in..." : "Continue"}
            <FaAngleDoubleRight size={20} />
          </button>

          {/* Or Separator */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-warm-800"></div>
            <span className="text-warm-400 text-xs uppercase font-medium">or</span>
            <div className="flex-1 h-px bg-warm-800"></div>
          </div>

          {/* Google Login */}
          <button
  onClick={async () => {
    await googleLogin();
    navigate("/"); // после успешного входа идём на Home
  }}
  disabled={_isPending}
  className={`${buttonClass} bg-warm-100 text-dark-900 hover:bg-warm-200 shadow-md hover:shadow-lg hover:scale-105`}
>
  {_isPending ? "Loading..." : "Sign in with Google"}
  <FcGoogle size={22} />
</button>
        </Form>
      ) : (
        // Password Recovery
        <Form
          method="post"
          className="w-full max-w-md bg-gradient-to-br from-dark-800 to-warm-950 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col gap-4 border border-warm-800/30"
        >
          <p className="text-center text-warm-300 text-sm mb-4">
            Password Recovery
          </p>

          <input
            type="email"
            placeholder="📧 Enter your email"
            name="emailRecovery"
            className={inputClass}
          />

          <button
            type="submit"
            className={`${buttonClass} bg-warm-600 text-warm-100 hover:bg-warm-500 hover:scale-105`}
          >
            Send Recovery Link
          </button>

          <button
            type="button"
            onClick={() => setRecoveryMode(false)}
            className={`${buttonClass} bg-dark-800 text-warm-300 hover:bg-dark-700 hover:text-warm-100 hover:scale-105`}
          >
            Back to Login
          </button>
        </Form>
      )}
    </div>
  );
}
