import React from "react"
import PostList from "./PostList"
import {fetchTopStories} from "../utility/api"
import Loading from "./Loading"

export default class Top extends React.Component
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
        fetchTopStories()
            .then(data => {
                this.setState({
                    posts: data
                });
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
                : <PostList posts={this.state.posts} />
        )
    }
}
