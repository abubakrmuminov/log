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

        <div className="min-h-screen bg-black p-6">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-medium text-white mb-2">Create New Task</h1>
                    <p className="text-gray-500 text-sm">Organize your work and assign team members</p>
                </div>

                <div className="glass rounded-lg p-6 animate-fade-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm text-gray-400 mb-2">
                                Task Title
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter a descriptive task title" 
                                id="title" 
                                name="title" 
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-all duration-200"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm text-gray-400 mb-2">
                                Description
                            </label>
                            <textarea 
                                name="description" 
                                id="description" 
                                placeholder="Provide detailed information about the task..."
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-all duration-200 resize-none"
                            ></textarea>
                        </div>

                        {/* Due date */}
                        <div>
                            <label htmlFor="doeto" className="block text-sm text-gray-400 mb-2">
                                Due Date
                            </label>
                            <input 
                                type="date" 
                                id="doeto" 
                                name="due-to" 
                                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-md text-white focus:outline-none focus:border-gray-700 transition-all duration-200"
                            />
                        </div>

                        {/* Users */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
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
                                            backgroundColor: '#030712',
                                            borderColor: '#1f2937',
                                            borderRadius: '6px',
                                            padding: '4px',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#374151',
                                            },
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#030712',
                                            borderRadius: '6px',
                                            border: '1px solid #1f2937',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '#ffffff' : state.isFocused ? '#1f2937' : 'transparent',
                                            color: state.isSelected ? '#000000' : '#ffffff',
                                            '&:hover': {
                                                backgroundColor: '#1f2937',
                                            },
                                        }),
                                        multiValue: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#ffffff',
                                            borderRadius: '4px',
                                        }),
                                        multiValueLabel: (provided) => ({
                                            ...provided,
                                            color: '#000000',
                                        }),
                                        multiValueRemove: (provided) => ({
                                            ...provided,
                                            color: '#000000',
                                            '&:hover': {
                                                backgroundColor: '#f3f4f6',
                                                color: '#000000',
                                            },
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#6b7280',
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
                                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium border border-gray-800 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-md font-medium btn-glow transition-all duration-200"
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