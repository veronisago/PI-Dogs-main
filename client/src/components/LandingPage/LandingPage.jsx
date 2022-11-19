import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
    return (
        <div className='landing-container'>
            <div className='landing-welcome'>
                <h1>Welcome!!</h1>
                <Link to='/home'>
                    <button className='landing-page-button'>
                        <h4 className='landing-button-text'>Enter</h4>
                        <img src="/hueso.png" alt="" />
                    </button>
                </Link>
            </div>
            <img src="/Dog1.png" alt='not found' />
        </div>
    )
}