import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import "./index.css"
import Nav from "./components/Nav"
import Loading from "./components/Loading"

const Top = React.lazy(() => import("./components/Top"));
const New = React.lazy(() => import ("./components/New"));
const Profile = React.lazy(() => import ("./components/Profile"));
const Comments = React.lazy(() => import ("./components/Comments"));

class App extends React.Component
{
    render()
    {
        return(
            <Router>
                <div className="container">
                    <Nav />
                    <React.Suspense fallback={<Loading />} >
                        <Switch>
                            <Route exact path="/" component={Top} />
                            <Route exact path="/new" component={New} />
                            <Route exact path="/user" component={Profile} />
                            <Route exact path="/post" component={Comments} />
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </React.Suspense>
                </div>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("app"));
