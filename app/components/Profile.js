import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import {getUserData, fetchPosts} from "../utility/api"

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
        const user = "EndXA";

        getUserData(user)
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
    render()
    {
        const {userdata, posts} = this.state;
        return (
            <div>
                {
                    this.state.loading
                        ? <Loading />
                        : (
                            <>
                                <div className="page-header">
                                    <div className="title page-title title-light">
                                        {userdata.username}
                                    </div>
                                    <div className="subtitle-light">
                                        <UserMetadata
                                            time={userdata.joined}
                                            karma={userdata.karma}
                                        />
                                    </div>
                                </div>
                                <div className="title section-title title-light">
                                    Posts
                                </div>
                                <PostList
                                    posts={posts.filter(post => post.title !== undefined)}
                                />
                            </>
                        )
                }
            </div>
        )
    }
}
