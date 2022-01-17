import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function UserCreation() {

    const [users, setUsers] = useState({
        isLoading: false,
        error: false,
        data: null,
    });

    const [userData, setUserData] = useState({})

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

    const onChangeUsername = (e) => {
        setUserData({ ...userData, username: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:4000/api/users", { username: userData.username });
        if (response) {
            setUserData({})
            setUsers({
                isLoading: false,
                error: false,
                data: null
            })
        }
    }

    const handleDeleteUser = async (id) => {
        const response = await axios.delete(`http://localhost:4000/api/users/${id}`);
        if (response) {
            setUsers({
                isLoading: false,
                error: false,
                data: null
            })
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <h3>Create new user</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={onChangeUsername}
                            value={userData.username || ""}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-2">
                        Save
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <h3>Users</h3>
                {users.data && (
                    <ul className="list-group">
                        {users.data.map((el) =>
                            <li
                                key={el._id}
                                className="list-group-item list-group-item-action"
                            >
                                {el.username}
                                <button onClick={() => handleDeleteUser(el._id)}>Delete</button>
                            </li>
                        )}
                    </ul>
                )}
                {users.isLoading && (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {users.error && (
                    <h1>There was an error loading users</h1>
                )}

            </div>
        </div>
    )
}