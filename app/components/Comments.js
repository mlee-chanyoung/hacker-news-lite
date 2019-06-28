import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import {NavLink} from "react-router-dom"
import {getPostData, fetchPosts} from "../utility/api"
import {ThemeConsumer} from "../contexts/theme"

import {PostMetadata} from "./Metadata"
import Loading from "./Loading"


function Comment({metadata, children})
{
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="comment-box">
                    <div className={`subtitle-${theme}`}>
                        <PostMetadata
                            id={metadata.id}
                            username={metadata.username}
                            time={metadata.date}
                            comments={metadata.comment_count}
                        />
                    </div>
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}

function CommentList({comments})
{
    return (
        <ThemeConsumer>
            {({theme}) => (
                <ul>
                    {comments.map((comment, index) => (
                        comment.text !== undefined && (
                            <li key={comment.metadata.id}>
                                <Comment
                                    metadata={comment.metadata}
                                >
                                    <div className="post-content">
                                        <p className={`${theme}-text`} dangerouslySetInnerHTML={{__html: comment.text}} />
                                    </div>
                                </Comment>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </ThemeConsumer>
    )
}

export default class Comments extends React.Component
{
    state = {
        postdata: {},
        comments: [],
        all: false
    }
    componentDidMount()
    {
        this.getPosts();
    }
    componentDidUpdate(prevProps)
    {
        if (this.props.location.search !== prevProps.location.search)
        {
            this.resetState();
            this.getPosts()
        }
    }
    getPosts = () => {
        const {id} = queryString.parse(this.props.location.search);
        getPostData(id)
            .then(data => {
                this.setState({postdata: data});
                if (data.metadata.comment_count > 0)
                {
                    let comments = data.metadata.comment_count > 50
                        ? data.comments.slice(0, 50)
                        : data.comments;
                    return fetchPosts(comments)
                        .then(comments => {
                            this.setState({
                                comments: comments
                            });
                        })
                }
            })
    }
    resetState = () => {
        this.setState({
            postdata: {},
            comments: [],
            all: false
        })
    }
    viewAll = () => {
        this.setState({
            all: true
        })
        let comments = this.state.postdata.comments.slice(50);
        fetchPosts(comments)
            .then(comments => {
                this.setState(state => {
                    return {
                        comments: state.comments.concat(comments)
                    }
                })
            })
    }
    render()
    {
        const {postdata, comments, remaining} = this.state;
        return (
            <>
            {
                !postdata.metadata
                    ? <Loading />
                    : (
                        <ThemeConsumer>
                            {({theme}) => (
                                <>
                                    {postdata.parent && (
                                        <div className={`return-link link-${theme}`}>
                                            <NavLink
                                                className="link"
                                                to={{
                                                    pathname: "/post",
                                                    search: `?id=${postdata.parent}`
                                                }}
                                            >
                                                &lt; View Parent
                                            </NavLink>
                                        </div>
                                    )}
                                    <div className="page-header">
                                        {postdata.title && (
                                            <div className={`title page-title title-${theme}`}>
                                                <a href={postdata.link}>{postdata.title}</a>
                                            </div>
                                        )}
                                        <div className={`subtitle-${theme}`}>
                                            <PostMetadata
                                                id={postdata.metadata.id}
                                                username={postdata.metadata.username}
                                                time={postdata.metadata.date}
                                                comments={postdata.metadata.comment_count}
                                            />
                                        </div>
                                        {postdata.text && (
                                            <div className="post-content">
                                                <p className={`${theme}-text`} dangerouslySetInnerHTML={{__html: postdata.text}} />
                                            </div>
                                        )}
                                    </div>
                                    {postdata.metadata.comment_count > 0 && (
                                        <>
                                            <div className={`title section-title title-${theme}`}>
                                                Comments
                                            </div>
                                            {comments.length > 0
                                                ? (<>
                                                    <CommentList comments={comments} />
                                                    {postdata.metadata.comment_count > 50
                                                        ? this.state.all
                                                            ? comments.length === 50 && <Loading />
                                                            : <button
                                                                className={`button-link link-${theme}`}
                                                                onClick={this.viewAll}>
                                                                View All
                                                            </button>
                                                        : <></>
                                                    }
                                                </>)
                                                : <Loading />
                                            }
                                        </>
                                    )}
                                </>
                            )}
                        </ThemeConsumer>
                    )
            }
            </>
        )
    }
}
