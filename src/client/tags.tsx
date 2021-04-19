import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '../utilities';

const Tags = () => {
    const [tags, setTags] = useState<Array<Tag>>(null);

    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(tagRes => {
                console.log(tagRes)
                setTags(tagRes)
            })
            
    }, [])
    return (
        <>
            <div className="row d-flex inline-block">
                {tags?.map(t => {
                    return (
                        <div className="col-md-4 p-3"  key={`tag-id-${t.id}`}>
                            <div className="card shadow my-2">
                                <div className="card-body">
                                    <h4 className='card-title'><Link to={`/tags/${t.id}`}>{t.name}</Link></h4>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Tags;