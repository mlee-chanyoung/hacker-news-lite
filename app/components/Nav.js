import React from "react"

const activeStyle = {
    color: "rgb(187, 46, 31)"
}

export default function Nav()
{
    return (
        <nav>
            <h1>Hacker News Lite</h1>
            <div className="nav-bar">
                <ul className="nav-links">
                    <li>Top</li>
                    <li>New</li>
                </ul>
                <button className="nav-button">
                    🔦
                </button>
            </div>
        </nav>
    )
}
