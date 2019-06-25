import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Top from "./components/Top"

class App extends React.Component
{
    render()
    {
        return(
            <div class="container">
                <Top />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("app"));
