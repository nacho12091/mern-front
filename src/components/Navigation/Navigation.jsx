import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    NotesApp
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="ms-auto navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link${pathname === "/" ? " active" : ""}`} to="/">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${pathname === "/create" ? " active" : ""}`} to="/create">Create note</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link${pathname === "/user" ? " active" : ""}`} to="/user">Create user</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}