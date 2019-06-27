import React from "react"
import PropTypes from "prop-types"
import {PostMetadata} from "./Metadata"

export default function Post({title, link, metadata})
{
    return (
        <>
            <div className="title post-title title-light">
                <a href={link}>{title}</a>
            </div>
            <div className="subtitle-light">
                <PostMetadata
                    id={metadata.id}
                    username={metadata.username}
                    time={metadata.date}
                    comments={metadata.comment_count}
                />
            </div>
        </>
    )
}
Post.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired
}
