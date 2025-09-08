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

    console.log(userOptions);


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

    return (

        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 p-6">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Create New Task</h1>
                    <p className="text-gray-400">Organize your work and assign team members</p>
                </div>

                <div className="glass rounded-2xl p-8 animate-fade-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Task Title
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter a descriptive task title" 
                                id="title" 
                                name="title" 
                                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea 
                                name="description" 
                                id="description" 
                                placeholder="Provide detailed information about the task..."
                                rows="4"
                                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            ></textarea>
                        </div>

                        {/* Due date */}
                        <div>
                            <label htmlFor="doeto" className="block text-sm font-medium text-gray-300 mb-2">
                                Due Date
                            </label>
                            <input 
                                type="date" 
                                id="doeto" 
                                name="due-to" 
                                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Users */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Assign Team Members
                            </label>
                            <div className="react-select-container">
                                <Select
                                    isMulti
                                    name="Users"
                                    options={userOptions}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder="Select team members..."
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#2a2a2a',
                                            borderColor: '#4a4a4a',
                                            borderRadius: '12px',
                                            padding: '4px',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#3b82f6',
                                            },
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#2a2a2a',
                                            borderRadius: '12px',
                                            border: '1px solid #4a4a4a',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#3a3a3a' : 'transparent',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: '#3a3a3a',
                                            },
                                        }),
                                        multiValue: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '8px',
                                        }),
                                        multiValueLabel: (provided) => ({
                                            ...provided,
                                            color: '#ffffff',
                                        }),
                                        multiValueRemove: (provided) => ({
                                            ...provided,
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: '#2563eb',
                                                color: '#ffffff',
                                            },
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#9ca3af',
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#ffffff',
                                        }),
                                        input: (provided) => ({
                                            ...provided,
                                            color: '#ffffff',
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button 
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium btn-glow transition-all duration-300"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask