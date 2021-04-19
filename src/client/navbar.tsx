import { Link } from 'react-router-dom';
import * as React from 'react'

const Navbar = () => {
    return (
        <div className='col'>
            <div className='row bg-dark w-100'>
                <Link to={'/posts'} className='btn btn-outline-primary m-2'>Posts</Link>
                <Link to={'/authors'} className='btn btn-outline-primary m-2'>Authors</Link>
                <Link to={'/tags'} className='btn btn-outline-primary m-2'>Explore Tags</Link>
                <Link to={'/panel'} className='btn btn-outline-primary m-2'>Create</Link>
                <Link to={'/contact'} className='btn btn-outline-primary m-2'>Contact Us</Link>
                <div className='justify-content-end'>
                    <Link to={'/login'} className='btn btn-outline-primary m-2 justify-content-right'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;