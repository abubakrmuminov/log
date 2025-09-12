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
    "px-5 py-3 rounded-xl bg-dark-800/80 text-warm-100 placeholder-warm-400 border border-warm-700/50 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 transition-all duration-300 backdrop-blur-sm";

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-warm-950 to-dark-900 px-4 py-8">
      <Form
        method="post"
        className="w-full max-w-md bg-gradient-to-br from-dark-800 to-warm-950 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col gap-4 sm:gap-6 border border-warm-800/30 backdrop-blur-sm"
      >
        {/* Header */}
        <p className="text-center text-warm-300 text-sm mb-4">
          Create your account{" "}
          <span className="text-warm-100 font-semibold">Register now</span>
        </p>

        {/* Inputs */}
        <input type="text" name="name" placeholder="👤 Your Name" className={inputClass} />
        <input type="email" name="email" placeholder="📧 Your Email" className={inputClass} />
        <input type="password" name="password" placeholder="🔒 Password" className={inputClass} />

        {/* Continue / Loading */}
        {!isPending ? (
          <button
            type="submit"
            className={`${buttonClass} bg-gradient-to-r from-warm-600 to-warm-700 text-warm-100 hover:scale-105 hover:shadow-lg hover:from-warm-500 hover:to-warm-600`}
          >
            Continue <FaAngleDoubleRight size={20} />
          </button>
        ) : (
          <button
            disabled
            className={`${buttonClass} bg-warm-700 text-warm-300 cursor-not-allowed`}
          >
            Loading...
          </button>
        )}

        {/* Link to Login */}
        <p className="text-center text-warm-400 text-sm mt-2">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-warm-300 hover:text-warm-200 hover:underline font-medium transition-colors"
          >
            Login
          </NavLink>
        </p>
      </Form>
    </div>
  );
}
