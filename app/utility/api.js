export function getPostData(id)
{
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return {
                title: data.title,
                link: data.url,
                text: data.text,
                parent: data.parent,
                comments: data.kids,
                metadata: {
                    id: data.id,
                    username: data.by,
                    date: data.time,
                    comment_count: data.kids === undefined ? 0 : data.kids.length
                }
            }
        })
}

export function getUserData(username)
{
    const url = `https://hacker-news.firebaseio.com/v0/user/${username}.json`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return {
                username: data.id,
                joined: data.created,
                karma: data.karma,
                about: data.about,
                posts: data.submitted
            }
        })
}

export function getCommentData(id)
{
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return {
                id: id,
                text: data.text,
                children: data.kids,
                metadata: {
                    username: data.by,
                    user_link: "#",
                    date: data.time
                }
            }
        })
}

export function fetchPosts(ids)
{
    return Promise.all(ids.map(id => getPostData(id)));
}

function fetchPostsByUrl(url)
{
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return fetchPosts(data.slice(0, 50));
        });
}

export function fetchTopStories()
{
    const url = "https://hacker-news.firebaseio.com/v0/topstories.json"
    return fetchPostsByUrl(url);
}

export function fetchNewStories()
{
    const url = "https://hacker-news.firebaseio.com/v0/newstories.json"
    return fetchPostsByUrl(url);
}
