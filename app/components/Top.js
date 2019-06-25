import React from "react"
import PostList from "./PostList"

export default class Top extends React.Component
{
    render()
    {
        return (
            <PostList
                posts={[
                    {
                        title: "Serebii",
                        link: "http://serebii.net/index2.shtml",
                        metadata: {
                            user_link: "https://youtube.com",
                            username: "Youtube",
                            date: "June 25th, 2019",
                            comment_link: "https://animenewsnetwork.com",
                            comment_count: 5
                        }
                    },
                    {
                        title: "Serebii",
                        link: "http://serebii.net/index2.shtml",
                        metadata: {
                            user_link: "https://youtube.com",
                            username: "Youtube",
                            date: "June 25th, 2019",
                            comment_link: "https://animenewsnetwork.com",
                            comment_count: 5
                        }
                    },
                ]}
            />
        )
    }
}
