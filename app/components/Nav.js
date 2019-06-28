import React from "react"
import {NavLink} from "react-router-dom"

const active_light = {
    color: "black"
}

const active_dark = {
    color: "white"
}

export default function Nav()
{
    return (
        <nav>
            <h1>Hacker News Lite</h1>
            <div className="nav-bar">
                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/"
                            exact
                            activeStyle={active_light}
                            className="nav-link nav-link-light"
                        >
                            Top
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/new"
                            exact
                            activeStyle={active_light}
                            className="nav-link nav-link-light"
                        >
                            New
                        </NavLink>
                    </li>
                </ul>
                <button className="nav-button">
                    🔦
                </button>
            </div>
        </nav>
    )
}
