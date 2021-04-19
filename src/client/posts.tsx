import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../utilities';

const Posts = () => {
    const [posts, setPosts] = useState<Array<Post>>(null);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(postRes => {
                console.log(postRes)
                setPosts(postRes)
            })
            
    }, [])
    
    useEffect(() => {

    })
    return (
        <>
            <div className="row d-flex inline-block">
                {posts?.map(p => {
                    return (
                        <div className="col-md-4 p-3"  key={`post-id-${p.id}`}>
                            <div className="card shadow my-2">
                                <div className="card-body">
                                    <h2 className='card-title'>{p.title}</h2>
                                    <p className='card-subtext'><Link to={`/tags/${p.tagid}`}>#{p.tagname}</Link></p>
                                    <p className='card-text'>{p.name}</p>
                                    <p className='card-subtext'><Link to={`/post/${p.id}`}>Read More</Link></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Posts;