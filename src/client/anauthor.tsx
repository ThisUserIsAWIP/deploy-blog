import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Author } from '../utilities';

const Anauthor = () => {
    const [author, setAuthor] = useState<Array<Author>>(null);
    let { id } = useParams<{ id: string }>()
    console.log(id)

    useEffect(() => {
        fetch(`/api/authors/${id}`)
            .then(res => res.json())
            .then(authorRes => {
                console.log({ authorRes })
                setAuthor(authorRes)

            })

    }, [id])
    if (!author) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div className="row d-flex inline-block justify-content-center">
                <div className="col-lg-10 p-3">
                    <div className="card shadow my-2">
                        <div className="card-body">
                            <h4 className='card-title'>{author[0]?.name}</h4>
                            <p className='card-subtext'>{author[0]?.email}</p>
                            <p className='card-text'>{author[0]?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                {author?.map(a => {
                    return (
                            <div className="col-md-8 p-3" key={`post-id-${a.postid}`}>
                                <div className="card shadow my-2">
                                    <div className="card-body">
                                        <h2 className='card-title'>{a.name}</h2>
                                        <p className='card-text'><Link to={`/post/${a.postid}`}>{a.title}</Link></p>
                                        {/* {authorWorks?.map(a => {
                                        return (
                                        <p className='card-text'><Link to={`/posts/${a.postid}`}>{a.title}</Link></p>
                                        )
                                    })} */}
                                    </div>
                                </div>
                            </div>
                    )

                })}

            </div>
        </>
    )
};

export default Anauthor;