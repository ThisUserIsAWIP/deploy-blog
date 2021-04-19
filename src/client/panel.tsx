import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Author, Post, Tag } from '../utilities';
import { apiService } from './utils/apiService';

const Panel = () => {
    // const [authorid, setAuthorid] = useState<Post['authorid']>();
    // const [authors, setAuthors] = useState<Array<Author>>(null);
    const [title, setTitle] = useState<Post['title']>();
    const [content, setContent] = useState<Post['content']>();
    const [tagid, setTagid] = useState<Tag['id']>(null);
    const [tags, setTags] = useState<Array<Tag>>();
    let history = useHistory()

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        const postData = {
            tagid: tagid,
            title: title,
            content: content
        }

        apiService('/api/posts', "POST", postData)
            .then(reply => {
                if (reply.sqlMessage) {
                    alert(reply.sqlMessage)
                } else { alert(reply.affectedRows) }
            })
            .then(() => history.push('/posts'))
        // fetch('/api/posts', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(postData)
        // })
        //     .then(res => res.json())
        //     .then(reply => {
        //         if (reply.sqlMessage) {
        //             alert(reply.sqlMessage)
        //         } else {alert(reply.affectedRows)}
        //     })
        //     .then(() => history.push('/posts'))
    }
    // useEffect(() => {
    //     fetch('/api/authors')
    //         .then(res => res.json())
    //         .then(postRes => {
    //             console.log(postRes)
    //             setAuthors(postRes)
    //         })

    // }, [])
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
                {/* <select defaultValue='default' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthorid(Number(e.target.selectedOptions[0].value))} className="form-control" id="exampleFormControlSelect1">
                    <option disabled value='default'>Select Author</option>
                    {authors?.map(a => {
                        return (
                            <option value={a.id} key={a.id}>{a.name}</option>
                        )
                    })}
                </select> */}
                <select defaultValue='default' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTagid(Number(e.target.selectedOptions[0].value))} className="form-control" id="exampleFormControlSelect1">
                    <option disabled value='default'>Select Tag</option>
                    {tags?.map(t => {
                        return (
                            <option value={t.id} key={t.id}>{t.name}</option>
                        )
                    })}
                </select>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} type="text" className="form-control" placeholder="Title" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} type="text" className="form-control" placeholder="Content" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                <button onClick={handleButtonClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div>
        </>
    )
};

export default Panel;