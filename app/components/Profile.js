import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import {getUserData, fetchPosts} from "../utility/api"
import {ThemeConsumer} from "../contexts/theme"

import PostList from "./PostList"
import {UserMetadata} from "./Metadata"
import Loading from "./Loading"


export default class Profile extends React.Component
{
    state = {
        loading: true,
        userdata: {},
        posts: []
    }
    componentDidMount()
    {
        this.getUser();
    }
    componentDidUpdate(prevProps)
    {
        if (this.props.location.search !== prevProps.location.search)
        {
            this.resetState();
            this.getPosts()
        }
    }
    getUser = () => {
        const {id} = queryString.parse(this.props.location.search);

        getUserData(id)
            .then(data => {
                this.setState({userdata: data});
                return fetchPosts(data.posts.slice(0, 50))
                    .then(posts => {
                        this.setState({
                            posts: posts,
                            loading: false
                        })
                    })
            })
    }
    resetState = () => {
        this.setState({
            loading: true,
            userdata: {},
            posts: []
        })
    }
    render()
    {
        const {userdata, posts} = this.state;
        return (
            <div>
                {
                    this.state.loading
                        ? <Loading />
                        : (
                            <ThemeConsumer>
                                {({theme}) => (
                                    <>
                                        <div className="page-header">
                                            <div className={`title page-title title-${theme}`}>
                                                {userdata.username}
                                            </div>
                                            <div className={`subtitle-${theme}`}>
                                                <UserMetadata
                                                    time={userdata.joined}
                                                    karma={userdata.karma}
                                                />
                                            </div>
                                        </div>
                                        <div className={`title section-title title-${theme}`}>
                                            Posts
                                        </div>
                                        <PostList
                                            posts={posts.filter(post => post.title !== undefined)}
                                        />
                                    </>
                                )}
                            </ThemeConsumer>
                        )
                }
            </div>
        )
    }
}
