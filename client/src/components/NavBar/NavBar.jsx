import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
    return (
        <div className='navBar'>
            <div className='nav-logo-container'>
                <img src="/LogoPI.png" alt="" className='nav-logo' />
            </div>
            <div className='nav-links'>
                <Link to='/home'>
                    <h3>Home</h3>
                </Link>
                <Link to='/dogs/create'>
                    <h3>Create New Dog</h3>
                </Link>
            </div>
        </div>
    )
}
