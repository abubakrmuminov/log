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
            alert("Mission Created Successfully! 🚀")
            navigate('/')
        })
    }

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(25px)",
            borderColor: "rgba(16, 185, 129, 0.3)",
            borderRadius: "16px",
            padding: "12px",
            color: "white",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            fontSize: "18px",
            fontWeight: "500",
            "&:hover": {
                borderColor: "rgba(16, 185, 129, 0.5)",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
            }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(25px)",
            borderRadius: "20px",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "white",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused 
                ? "rgba(16, 185, 129, 0.2)" 
                : "transparent",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            "&:hover": {
                backgroundColor: "rgba(16, 185, 129, 0.3)",
            }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "rgba(16, 185, 129, 0.3)",
            borderRadius: "12px",
            border: "1px solid rgba(16, 185, 129, 0.5)",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "white",
            fontWeight: "600",
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
            fontWeight: "500",
        }),
        input: (base) => ({
            ...base,
            color: "white",
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgba(148, 163, 184, 0.7)",
            fontSize: "16px",
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Enhanced animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
            </div>

            {/* Floating particles */}
            <div className="particles">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${8 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-3xl">
                <form 
                    onSubmit={handleSubmit} 
                    className="glass rounded-3xl p-12 shadow-2xl space-y-10 backdrop-blur-xl border border-amber-400/30 glow-gold"
                >
                    {/* Enhanced Header */}
                    <div className="text-center mb-12">
                        <div className="relative inline-block mb-8">
                            <div className="w-28 h-28 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-gold">
                                <span className="text-5xl">🚀</span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                        </div>
                        <h1 className="text-5xl font-bold gradient-text mb-4">Create New Mission</h1>
                        <p className="text-xl text-slate-300 font-medium">Launch your next cosmic adventure and collaborate with your stellar team</p>
                    </div>

                    {/* Enhanced Title */}
                    <div className="space-y-4">
                        <label htmlFor="title" className="block text-lg font-bold text-amber-300 flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Mission Title</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter a compelling mission title" 
                            id="title" 
                            name="title"
                            className="w-full px-8 py-6 glass rounded-2xl text-white placeholder-slate-400 border border-amber-400/30 input-focus transition-all duration-300 text-lg font-medium"
                        />
                    </div>

                    {/* Enhanced Description */}
                    <div className="space-y-4">
                        <label htmlFor="description" className="block text-lg font-bold text-emerald-300 flex items-center space-x-2">
                            <span>📋</span>
                            <span>Mission Briefing</span>
                        </label>
                        <textarea 
                            name="description" 
                            id="description" 
                            placeholder="Provide detailed mission objectives and requirements..."
                            rows={5}
                            className="w-full px-8 py-6 glass rounded-2xl text-white placeholder-slate-400 border border-emerald-400/30 input-focus transition-all duration-300 resize-none text-lg font-medium leading-relaxed"
                        ></textarea>
                    </div>

                    {/* Enhanced Due date */}
                    <div className="space-y-4">
                        <label htmlFor="doeto" className="block text-lg font-bold text-violet-300 flex items-center space-x-2">
                            <span>⏰</span>
                            <span>Mission Deadline</span>
                        </label>
                        <input 
                            type="date" 
                            id="doeto" 
                            name="due-to"
                            className="w-full px-8 py-6 glass rounded-2xl text-white border border-violet-400/30 input-focus transition-all duration-300 text-lg font-medium"
                        />
                    </div>

                    {/* Enhanced Users */}
                    <div className="space-y-4">
                        <label className="block text-lg font-bold text-pink-300 flex items-center space-x-2">
                            <span>👥</span>
                            <span>Assign Crew Members</span>
                        </label>
                        <div className="relative">
                            <Select
                                isMulti
                                name="Users"
                                options={userOptions}
                                placeholder="Select stellar team members for this mission..."
                                styles={customSelectStyles}
                                className="text-white"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>

                    {/* Enhanced Buttons */}
                    <div className="flex gap-6 pt-8">
                        <button 
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 py-6 glass rounded-2xl font-bold text-slate-300 hover:text-white hover:bg-slate-500/10 transition-all duration-300 border border-slate-400/30 text-lg"
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>←</span>
                                <span>Cancel Mission</span>
                            </span>
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-6 btn-primary rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-gold text-lg"
                        >
                            <span className="flex items-center justify-center space-x-3">
                                <span>🚀</span>
                                <span>Launch Mission</span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask