import React from "react"
import PropTypes from "prop-types"

export default function Post({title, link, metadata})
{
    return (
        <>
            <div className="post-title title-light">
                <a href={link}>{title}</a>
            </div>
            <div className="post-subtitle subtitle-light">
                <span>
                    by <a href={metadata.user_link}>{metadata.username}</a>
                </span>
                <span>
                    on {metadata.date}
                </span>
                <span>
                    with <a href={metadata.comment_link}>{metadata.comment_count}</a> comments
                </span>
            </div>
        </>
    )
}
Post.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired
}
