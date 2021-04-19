import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Author } from '../utilities';

const Authors = () => {
    const [authors, setAuthors] = useState<Array<Author>>(null);

    useEffect(() => {
        fetch('/api/authors')
            .then(res => res.json())
            .then(postRes => {
                console.log(postRes)
                setAuthors(postRes)
            })
            
    }, [])
    return (
        <>
            <div className="row d-flex inline-block">
                {authors?.map(a => {
                    return (
                        <div className="col-md-4 p-3" key={`author-id-${a.id}`}>
                            <div className="card shadow my-2">
                                <div className="card-body">
                                    <h4 className='card-title'>{a.name}</h4>
                                    <p className='card-subtext'>{a.email}</p>
                                    <p className='card-subtext'><Link to={`/authors/${a.id}`}>Discover</Link></p>
                                    <p className='card-text'>{a.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Authors;