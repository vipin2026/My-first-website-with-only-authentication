import React from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'

export default function Topbar() {
    return (
        
            <div className='main-container'>
                <ul>
                    <li>
                        <Link to="/">Home </Link>
                    </li>
                    <li>
                        <Link to="/about">About </Link>
                    </li>
                    <li>
                        <Link to="/signup">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/login">Login </Link>
                    </li>
                </ul>
            </div>
        
    )
}