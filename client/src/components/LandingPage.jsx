import React from 'react'
import { Link } from "react-router-dom"
import "./CSS/LandingPage.css"

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <div>
                <h1>Countries From The World </h1>
            </div>
            <Link to="/Home">
                <button className='button-landing'>Join!</button>
            </Link>
            <div className='parrafos'>
                <p>All the countries you want in only one click!</p>
            </div>
        </div>
    )
}

export default LandingPage;