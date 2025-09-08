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
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="glass rounded-lg p-8 w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-medium text-white mb-2">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join us and start managing your tasks</p>
                </div>

                <Form method="post" className="space-y-6">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Full name" 
                            name="name" 
                            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-all duration-200"
                        />
                    </div>
                    
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            name="email" 
                            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-all duration-200"
                        />
                    </div>
                    
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-all duration-200"
                        />
                    </div>
                    
                    {!isPending ? (
                        <button 
                            type="submit"
                            className="w-full bg-white hover:bg-gray-100 text-black px-4 py-3 rounded-md font-medium btn-glow transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <span>Create Account</span>
                            <FaAngleDoubleRight size={16} />
                        </button>
                    ) : (
                        <button 
                            disabled 
                            className="w-full bg-gray-900 text-gray-500 px-4 py-3 rounded-md font-medium opacity-50 cursor-not-allowed"
                        >
                            Loading...
                        </button>
                    )}
                </Form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{' '}
                        <NavLink to="/login" className="text-white hover:text-gray-300 font-medium transition-colors duration-200">
                            Sign in
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}