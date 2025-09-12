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
    "px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300";

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Form
        method="post"
        className="w-full max-w-md bg-neutral-900 p-8 rounded-3xl shadow-2xl flex flex-col gap-6"
      >
        {/* Header */}
        <p className="text-center text-gray-300 text-sm mb-4">
          Create your account{" "}
          <span className="text-white font-semibold">Register now</span>
        </p>

        {/* Inputs */}
        <input type="text" name="name" placeholder="Your Name" className={inputClass} />
        <input type="email" name="email" placeholder="Your Email" className={inputClass} />
        <input type="password" name="password" placeholder="Password" className={inputClass} />

        {/* Continue / Loading */}
        {!isPending ? (
          <button
            type="submit"
            className={`${buttonClass} bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 hover:shadow-lg`}
          >
            Continue <FaAngleDoubleRight size={20} />
          </button>
        ) : (
          <button
            disabled
            className={`${buttonClass} bg-gray-600 text-gray-300`}
          >
            Loading...
          </button>
        )}

        {/* Link to Login */}
        <p className="text-center text-gray-400 text-sm mt-2">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </NavLink>
        </p>
      </Form>
    </div>
  );
}
