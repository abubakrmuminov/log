import { Form, useNavigate } from "react-router-dom"
import { useCollection } from "../hook/useCollection"
import Select from 'react-select';
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function CreateTask() {
    const navigate = useNavigate()
    const { data } = useCollection("users")
    const [userOptions, setUserOptions] = useState(null)

    useEffect(() => {
        const users = data?.map((user) => {
            return {
                value: user.displayName,
                label: user.displayName,
                photoURL: user.photoUrl,
                uid: user.uid
            }
        })
        setUserOptions(users)
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const name = formdata.get('title')
        const description = formdata.get('description')
        const dueto = formdata.get('due-to')
        const task = {
            name,
            description,
            dueto,
            userOptions,
            comments: []
        }

        await addDoc(collection(db, "task"), {
            ...task,
        }).then(() => {
            alert("Qoshildi")
            navigate('/')
        })
    }

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            padding: "8px",
            color: "white",
            boxShadow: "none",
            "&:hover": {
                borderColor: "rgba(147, 51, 234, 0.5)",
            }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "rgba(30, 30, 30, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused 
                ? "rgba(147, 51, 234, 0.2)" 
                : "transparent",
            color: "white",
            "&:hover": {
                backgroundColor: "rgba(147, 51, 234, 0.3)",
            }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "rgba(147, 51, 234, 0.3)",
            borderRadius: "8px",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "white",
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "white",
            "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.3)",
                color: "white",
            }
        }),
        singleValue: (base) => ({
            ...base,
            color: "white",
        }),
        input: (base) => ({
            ...base,
            color: "white",
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgba(255, 255, 255, 0.5)",
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                <form 
                    onSubmit={handleSubmit} 
                    className="glass rounded-3xl p-8 shadow-2xl space-y-8 backdrop-blur-xl border border-white/20"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span className="text-3xl">✨</span>
                        </div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">Create New Task</h1>
                        <p className="text-gray-300">Organize your work and collaborate with your team</p>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-purple-300">
                            📝 Task Title
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter a descriptive task title" 
                            id="title" 
                            name="title"
                            className="w-full px-6 py-4 glass rounded-2xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-purple-300">
                            📄 Description
                        </label>
                        <textarea 
                            name="description" 
                            id="description" 
                            placeholder="Provide detailed information about the task..."
                            rows={4}
                            className="w-full px-6 py-4 glass rounded-2xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                        ></textarea>
                    </div>

                    {/* Due date */}
                    <div className="space-y-2">
                        <label htmlFor="doeto" className="block text-sm font-semibold text-purple-300">
                            📅 Due Date
                        </label>
                        <input 
                            type="date" 
                            id="doeto" 
                            name="due-to"
                            className="w-full px-6 py-4 glass rounded-2xl text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Users */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-purple-300">
                            👥 Assign Team Members
                        </label>
                        <Select
                            isMulti
                            name="Users"
                            options={userOptions}
                            placeholder="Select team members to assign..."
                            styles={customSelectStyles}
                            className="text-white"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 py-4 glass rounded-2xl font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/20"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg glow"
                        >
                            ✨ Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask