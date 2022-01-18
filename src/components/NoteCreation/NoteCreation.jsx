import React, { useEffect, useState } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useLocation } from 'react-router-dom';

export default function NoteCreation() {

    const { id } = useParams();
    const { pathname } = useLocation();

    const [users, setUsers] = useState({
        isLoading: false,
        error: false,
        data: null,
    });

    const [noteData, setNoteData] = useState({
        date: new Date()
    });

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchNoteData = async () => {
            const response = await axios.get(`http://localhost:4000/api/notes/${id}`);
            const { author, content, date, title } = response.data;
            setNoteData({
                username: author,
                title: title,
                content: content,
                date: new Date(date)
            });
        }
        if (id) {
            fetchNoteData();
            setEditing(true);
        } else {
            setEditing(false);
        }
    }, [id, pathname])

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
        e.preventDefault();
        const newNote = {
            title: noteData.title,
            content: noteData.content,
            date: noteData.date,
            author: noteData.username,
        }
        if (editing) {
            await axios.put(`http://localhost:4000/api/notes/${id}`, newNote);
        } else {
            await axios.post("http://localhost:4000/api/notes", newNote);
        }
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
                <h4>Note {editing ? "edition" : "creation"}</h4>
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
                            value={noteData.title || ""}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group my-2">
                        <textarea
                            className="form-control"
                            placeholder="Note content"
                            name="content"
                            value={noteData.content || ""}
                            required
                            onChange={handleInputChange}
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