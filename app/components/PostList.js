import React from "react"
import PropTypes from "prop-types"
import Post from "./Post"

export default function PostList({posts})
{
    return (
        <ul>
            {posts.map((post, index) => (
                <li key={index} className="post">
                    <Post
                        title={post.title}
                        link={post.link}
                        metadata={post.metadata}
                    />
                </li>
            ))}
        </ul>
    )
}
PostList.propTypes = {
    posts: PropTypes.array.isRequired
}
