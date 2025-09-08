    import { Form, NavLink, useActionData } from "react-router-dom";
    import { useRegister } from "../hook/useRegister";
    import { useEffect } from "react";
    import { formError } from "../components/ErrorId";
    import { FaAngleDoubleRight } from "react-icons/fa";

    export async function action({ request }) {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        return data

    }


    export default function Register() {


        const data = useActionData()
        const { register,  isPending } = useRegister()


        useEffect(() => {
            if (data?.name && data?.email && data?.password) {
                register(data.name, data.email, data.password);

            } else {
                data ? formError(data) : false
            }
        }, [data])


        return (
            <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center p-6">
                <div className="glass rounded-2xl p-8 w-full max-w-md animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join us and start managing your tasks</p>
                    </div>

                    <Form method="post" className="space-y-6">
                        <div>
                            <input 
                                type="text" 
                                placeholder="Full name" 
                                name="name" 
                                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        
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
                        
                        {!isPending ? (
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium btn-glow transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>Create Account</span>
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
        )
    }

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <NavLink to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>