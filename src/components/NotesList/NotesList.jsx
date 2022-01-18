import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NotesList() {

    const [notes, setNotes] = useState({
        isLoading: false,
        error: false,
        data: null,
    })

    useEffect(() => {
        const fetchNotesData = async () => {
            setNotes((oldNotes) => {
                return {
                    oldNotes,
                    isLoading: true
                }
            });
            try {
                const response = await axios.get("http://localhost:4000/api/notes");
                setNotes({
                    isLoading: false,
                    error: false,
                    data: response.data,
                })
            } catch (error) {
                setNotes({
                    isLoading: false,
                    error: true,
                    data: null,
                })
            }
        };
        if (!notes.data && !notes.isLoading && !notes.error) {
            fetchNotesData();
        }
    }, [notes])

    const handleDeleteNote = async (id) => {
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        setNotes({
            isLoading: false,
            error: false,
            data: null,
        })
    }

    return (
        <div className="row">
            {notes.data && (
                notes.data.map((el) => {
                    return (
                        <div key={el._id} className="col-md-4 p-2">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>
                                        {el.title}
                                    </h5>
                                    <Link className="btn btn-secondary" to={`/edit/${el._id}`}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{el.content}</p>
                                    <p>{el.author}</p>
                                    <p>{new Date(el.date).toLocaleDateString()}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => handleDeleteNote(el._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
            {notes.isLoading && (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {notes.error && (
                <h1>There was an error loading notes</h1>
            )}
        </div>
    )
}