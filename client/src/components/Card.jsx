import React from 'react'
import { Link } from "react-router-dom";
import "./CSS/Card.css"


const Card = ({id, image, name, continents}) => { // los argumentos vienen por props del home
    return (
        <div className='card'>
            <div className='img-card'>
                <img src={image} alt="img not found" width="250px" height="200px"></img>
            </div>
            <h4><Link to={`/countries/${id}`}>{name}</Link></h4>
            <h5>{continents}</h5>
        </div>
    )
}

export default Card;