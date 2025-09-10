import { Form, NavLink, useActionData } from "react-router-dom";
import { useRegister } from "../hook/useRegister";
import { useEffect } from "react";
import { formError } from "../components/ErrorId";
import { FaAngleDoubleRight } from "react-icons/fa";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Register() {
  const data = useActionData();
  const { register, isPending } = useRegister();

  useEffect(() => {
    if (data?.name && data?.email && data?.password) {
      register(data.name, data.email, data.password);
    } else {
      data ? formError(data) : false;
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Form
        method="post"
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <p className="text-center text-gray-300 text-sm mb-4">
          Welcome to{" "}
          <span className="text-white font-medium">Register to continue</span>{" "}
          <NavLink to={"/login"} className="text-blue-400 hover:underline">
            Login
          </NavLink>
        </p>

        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {!isPending && (
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
            Continue <FaAngleDoubleRight size={18} />
          </button>
        )}

        {isPending && (
          <button
            disabled
            className="w-full py-2 bg-gray-600 text-gray-300 rounded-lg"
          >
            Loading...
          </button>
        )}
      </Form>
    </div>
  );
}
