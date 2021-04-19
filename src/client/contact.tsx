import * as React from 'react';
import { useState } from 'react';
import { apiService } from './utils/apiService';
const Contact = () => {

    const [values, setValues] = useState<{ [key: string]: string }>(null);
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(values)
        let res = await apiService('/api/contact', 'POST', {
            email: values.email,
            subject: values.subject,
            content: values.content
        })
        console.log(res)
        setValues(null)
    }
    return (
        <>
            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-6">
                        <form className="form-group border rounded shadow p-4">
                            <label>Your Email</label>
                            <input name="email" value={values?.email || ''} onChange={handleChanges} type="email" className="form-control"/>
                            <label>Subject</label>
                            <input name="subject" value={values?.subject || ''} onChange={handleChanges} type="text" className="form-control"/>
                            <label>Content</label>
                            <input name="content" value={values?.content || ''} onChange={handleChanges} type="text" className="form-control"/>
                            <button onClick={handleSubmit} className="btn btn-primary mt-3">Send Email</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}


export default Contact;