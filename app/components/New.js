import React from "react"
import PostList from "./PostList"
import {fetchNewStories} from "../utility/api"
import Loading from "./Loading"

export default class New extends React.Component
{
    state = {
        posts: [],
        error: null
    }
    componentDidMount()
    {
        this.updatePosts();
    }
    updatePosts = () => {
        fetchNewStories()
            .then(data => {
                this.setState({
                    posts: data
                });
            })
            .catch(({message}) => {
                this.setState({
                    error: "Failed to retrieve posts. " + message
                })
            });
    }
    isLoading = () => {
        const { posts, error } = this.state;
        return posts.length === 0 && error === null;
    }
    render()
    {
        return (
            this.isLoading()
                ? <Loading />
                : this.state.error
                    ? <p>{this.state.error}</p>
                    : <PostList posts={this.state.posts} />
        )
    }
}
