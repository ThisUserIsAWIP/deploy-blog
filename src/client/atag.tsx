import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostsOfATag } from '../utilities';

const Atag = () => {
    
    const [postTags, setPostTags] = useState<Array<PostsOfATag>>(null);
    
    let {id} = useParams<{id: string}>()
    
    useEffect(() => {
        fetch(`/api/posttags/${id}`)
        .then(res => res.json())
        .then(posttagRes => {
            console.log(posttagRes)
            setPostTags(posttagRes)
        })
    }, [id])

    return (
        <>
            <div className="row d-flex inline-block">
                {postTags?.map(p => {
                    return (
                        <div className="col-md-4 p-3"  key={`post-id-${p.id}`}>
                            <div className="card shadow my-2">
                                <div className="card-body">
                                    <h4 className='card-title'>{p.title}</h4>
                                    <p className='card-text'><Link to={`/authors/${p.authorid}`}>{p.name}</Link></p>
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

export default Atag;