import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getDetail } from '../redux/actions';
import { Link } from 'react-router-dom';
import "./CSS/Detail.css"
import "./CSS/Header.css"
import "./CSS/Buttons.css"


const Detail = () => {
    const myCountry = useSelector((state) => state.detail);
    console.log(myCountry)

    const dispatch = useDispatch();
    const {id} = useParams(); // Hook de react-router-dom que lee los params. match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id]); // Al construirse, se despacha el getCountryId( id pasado por Params)
    // console.log(myCountry.name)

    return (
        <div className='detail-background'>
            <header className='main-header'>
                <div>
                    <h1>
                        <Link to={"/"}><span>C</span>lick <span>M</span>aps</Link>
                    </h1>

                    <div>
                        <Link to="/Home"><button>Home</button></Link>
                    </div>
                </div>
            </header>         
            
            {
                myCountry
                ?
                    <div className='detail-body'>
                        <div className='detail-grid'>
                            <div className='detail-image'>
                                <img src={myCountry.image} width="480" alt="alt text" />
                            </div>
                            
                            <div className='detail-specs'>
                                <h2>Name: {myCountry.name}</h2>
                                <p>ID: {myCountry.id}</p>
                                <p>Continents: {myCountry.continents}</p>
                                <p>Capital: {myCountry.capital}</p>
                                <p>Subregion: {myCountry.subregion}</p>
                                <p>Area: {myCountry.area} km²</p>
                                <p>Population: {myCountry.population}</p>
                                <p>Dishes: {myCountry.dishes}</p>
                                <p>Activities: </p>
                                
                                
                            </div>

                        </div>

                        <div className='activities-specs'>
                                   {
                                        myCountry.activities
                                        ?
                                        myCountry.activities.map(a => 
                                                <div key={a}>
                                                    <h3>{a.name}</h3>
                                                    <p>Difficulty: {a.difficulty}</p>
                                                    <p>Duration: {a.duration}</p>
                                                    <p>Season: {a.season}</p>
                                                </div>
                                            )
                                            :
                                            <>
                                                <p>There is no activities</p>
                                            </>
                                    } 
                            </div>

                    </div>
                :
                <div>
                    <h2>Loading...</h2>
                </div>
            }
        </div>
    )
}

export default Detail;

