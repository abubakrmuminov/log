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

        <div className="task">
            <form onSubmit={handleSubmit} className="form-container">
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter task title" id="title" name="title" />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="Enter task description"></textarea>
                </div>

                {/* Due date */}
                <div className="form-group">
                    <label htmlFor="doeto">Due to</label>
                    <input type="date" id="doeto" name="due-to" />
                </div>

                {/* Users */}
                <div className="form-group">
                    <label>Assign Users</label>
                    <Select
                        isMulti
                        name="Users"
                        options={userOptions}
                        className="select-users"
                        classNamePrefix="react-select"
                    />
                </div>

                {/* Button */}
                <button type="submit" className="submit-btn">Create Task</button>
            </form>
        </div>
    )
}

export default CreateTask
