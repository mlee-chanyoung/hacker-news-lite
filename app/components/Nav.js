import React from "react"
import {NavLink} from "react-router-dom"
import {ThemeConsumer} from "../contexts/theme"

const active_light = {
    color: "black"
}

const active_dark = {
    color: "white"
}

export default function Nav()
{
    return (
        <ThemeConsumer>
            {({theme, toggleTheme, isLight}) => (
                <nav>
                    <h1>Hacker News Lite</h1>
                    <div className="nav-bar">
                        <ul className="nav-links">
                            <li>
                                <NavLink
                                    to="/"
                                    exact
                                    activeStyle={isLight() ? active_light : active_dark}
                                    className={`nav-link nav-link-${theme}`}
                                >
                                    Top
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/new"
                                    exact
                                    activeStyle={isLight() ? active_light : active_dark}
                                    className={`nav-link nav-link-${theme}`}
                                >
                                    New
                                </NavLink>
                            </li>
                        </ul>
                        <button
                            className="nav-button"
                            onClick={toggleTheme}>
                            {theme === "light"
                                ? "🔦"
                                : "💡"
                            }
                        </button>
                    </div>
                </nav>
            )}
        </ThemeConsumer>
    )
}
