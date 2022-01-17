import React, { useEffect, useState } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NoteCreation() {
    const [users, setUsers] = useState({
        isLoading: false,
        error: false,
        data: null,
    });

    const [noteData, setNoteData] = useState({
        date: new Date()
    });

    useEffect(() => {
        const fetchUsersData = async () => {
            setUsers((oldUsers) => {
                return {
                    ...oldUsers,
                    isLoading: true
                }
            });
            try {
                const response = await axios.get("http://localhost:4000/api/users");
                setUsers({
                    isLoading: false,
                    error: false,
                    data: response.data
                });
            } catch (error) {
                setUsers({
                    isLoading: false,
                    error: true,
                    data: null,
                })
            }
        }
        if (!users.data && !users.isLoading && !users.error) {
            fetchUsersData();
        }
    }, [users]);

    const onSubmit = async (e) => {
        console.log(noteData);
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (date) => {
        setNoteData({
            ...noteData,
            date: date
        })
    }

    return (
        <div className="col-md-6 offset-md-3 card">
            <div className="card-header">
                <h4>Note creation</h4>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <select
                            className="form-control my-2"
                            name="username"
                            onChange={(e) => { handleInputChange(e) }}
                            value={noteData.username || ""}
                            required
                        >
                            <option value="">Select a user</option>
                            {users.data && users.data.map((el) => {
                                return <option key={el._id} value={el.username}>{el.username}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group my-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Note title"
                            name="title"
                            required
                        />
                    </div>
                    <div className="form-group my-2">
                        <textarea
                            className="form-control"
                            placeholder="Note content"
                            name="content"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={noteData.date}
                            placeholderText="Select a date"
                            onChange={(date) => handleDateChange(date)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}