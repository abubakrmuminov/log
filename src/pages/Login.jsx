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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {!form && (
        <Form
          method="post"
          className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          <p className="text-center text-gray-300 text-sm mb-4">
            Welcome,{" "}
            <span className="text-white font-medium">Login to continue</span>{" "}
            <NavLink to={"/register"} className="text-blue-400 hover:underline">
              Register
            </NavLink>
          </p>

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          {/* Separator */}
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-neutral-700"></div>
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-neutral-700"></div>
          </div>

          {/* Forget Password */}
          <button
            type="button"
            onClick={() => setForm(!form)}
            className="w-full py-2 bg-neutral-800 text-gray-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Forget password
          </button>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          {/* Github */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition"
          >
            <FaGithub size={20} /> Continue with Github
          </button>

          {/* Continue */}
          {!isPending && (
            <button
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Continue <FaAngleDoubleRight size={18} />
            </button>
          )}

          {isPending && (
            <button
              className="w-full py-2 bg-gray-600 text-gray-300 rounded-lg"
              disabled
            >
              Loading...
            </button>
          )}
        </Form>
      )}

      {/* Password Recovery */}
      {form && (
        <Form
          method="post"
          className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          <p className="text-center text-gray-300 text-sm mb-4">
            Welcome,{" "}
            <span className="text-white font-medium">Password Recovery</span>
          </p>

          <input
            type="email"
            placeholder="Email"
            name="emailRecovery"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
            Send
          </button>

          <button
            type="button"
            onClick={() => setForm(!form)}
            className="w-full py-2 bg-neutral-800 text-gray-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Show login
          </button>
        </Form>
      )}
    </div>
  );
}
