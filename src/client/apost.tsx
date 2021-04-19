import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post, PostTags } from '../utilities';

const Apost = () => {
    const [post, setPost] = useState<Array<Post>>(null);
    let {id} =useParams<{id:string}>()
    console.log(id)
    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(postRes => {
                console.log(postRes)
                setPost(postRes)
            })
            
    }, [id])
    return (
        <>
            <div className="row d-flex inline-block justify-content-center">
                {post?.map(p => {
                    return (
                        <div className="col-md-8 p-3" key={`this-post-id-${p.id}`}>
                            <div className="card shadow my-2">
                                <div className="card-body">
                                    <h4 className='card-title'>{p.title}</h4>
                                    <p className='card-subtext'><Link to={`/authors/${p.authorid}`}>{p.name}</Link></p>
                                    <p className='card-text'>{p.content}</p>
                                </div>
                            </div>
                        </div>
                    
                    )
                
                })}
            </div>
        </>
    )
};

export default Apost;