import React from "react"
import PropTypes from "prop-types"
import {PostMetadata} from "./Metadata"
import {ThemeConsumer} from "../contexts/theme"

export default function Post({title, link, metadata})
{
    return (
        <ThemeConsumer>
            {({theme}) => (
                <>
                    <div className={`title post-title title-${theme}`}>
                        <a href={link}>{title}</a>
                    </div>
                    <div className={`subtitle-${theme}`}>
                        <PostMetadata
                            id={metadata.id}
                            username={metadata.username}
                            time={metadata.date}
                            comments={metadata.comment_count}
                        />
                    </div>
                </>
            )}
        </ThemeConsumer>
    )
}
Post.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired
}
