import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { FilterByContinent, getActivities, getCountries, orderByName, orderByPopulation, filterByActivity } from '../redux/actions';
import Pagination from './Pagination';
import Card from './Card';
import "./CSS/Card.css";
import "./CSS/Header.css"
import SearchBar from './SearchBar';



const Home = () => {

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities)

    useEffect(() => {
        dispatch(getCountries()); // usamos el useEffect para cargar los paises en la página
    }, [dispatch]) // solo cuando haya dispatch

    useEffect(() => {
        dispatch(getActivities()) // usamos el useEffect para cargar las actividades en la página
    }, [dispatch])

    const [order, setOrder] = useState("") // seteamos el estado del orden que usaremos luego para los filtros

    const [currentPage, setCurrentPage] = useState(1); // lo seteamos en 1 para que nuestra página inicial sea 1
    const [countriesPerPage, {/*setCountriesPerPage */}] = useState(10); // con esto seteamos la cantidad de paises que queremos por página
    const indexOfLastCountry = currentPage * countriesPerPage; // 10
    const indexOfFistCountry = indexOfLastCountry - countriesPerPage; // 0 - 10 - 20 -
    const currentCountry = allCountries.slice(indexOfFistCountry, indexOfLastCountry) // cogemos unicamente el índice del primero y del últimopara que muestre lo que hay entre ellos


    function handleReset (e) {
        e.preventDefault(); // previene que si algo falla, no siga ejecutando la función
        dispatch(getCountries()); // vuelve a cargar los paises.
        refOrder.current.value = "a-z" // setea el orden del filtro alfabético en ese value
        refCont.current.value = "All" // setea el orden del filtro por continentes en ese value
        refPop.current.value = "default" // setea el orden del filtro por población en ese value
        paginado(1); // vuelve a poner todo en la página 1
    }

    function handleSort(e){
        e.preventDefault(); // previene que si algo falla, no siga ejecutando la función
        dispatch(orderByName(e.target.value)) // llama a la actions desde el store y  busca por el target.value(lo que le pongamos)
        paginado(1) // setea el paginado en 1
        setOrder(`Order: ${e.target.value}`) // setea el orden al que pongamos.
    }

    function handlePopulation(e){
        e.preventDefault(); // previene que si algo falla, no siga ejecutando la función
        // console.log(e.target.value)
        dispatch(orderByPopulation(e.target.value)) // llama a la actions desde el store y  busca por el target.value(lo que le pongamos)
        paginado(1);
        setOrder(`Order: ${e.target.value}`); // setea el orden al que pongamos.
    }

    function changeContinent(e) {
        e.preventDefault(); // previene que si algo falla, no siga ejecutando la función
        dispatch(FilterByContinent(e.target.value)); // llama a la actions desde el store y  busca por el target.value(lo que le pongamos)
        paginado(1)
        // refPop.current.value = "default" 
        console.log(FilterByContinent(e.target.value))
    }

    function filterByActivitie(e){
        e.preventDefault() // previene que si algo falla, no siga ejecutando la función
        dispatch(filterByActivity(e.target.value)) // llama a la actions desde el store y  busca por el target.value(lo que le pongamos)
        paginado(1)
    }

    const paginado = (pageNumber) => { // creamos la variable paginado usando como argumento el número de la página, seteamos la página actual a la que pongamos.
        setCurrentPage(pageNumber)
    }

    const refOrder = useRef(null);
    const refCont = useRef(null);
    const refPop = useRef(null);

    return (
        <div className='main-background'>
            <header className='main-header'>
                <h1>
                    <Link to="/">
                        <span>C</span>lick <span>M</span>aps
                    </Link>
                </h1>
            </header>
            <header className="sub-header">
                <div className="sub-header-item">
                    <label>Order: </label>
                        <select ref={refOrder} onChange={(e) => {handleSort(e)}}>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                </div>

                <div className="sub-header-item">
                    <label>Continent: </label>
                    <select name="continent" ref={refCont} onChange={changeContinent}>
                        <option value="All">All</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                            {/* {
                                allCountries.map((c) => {
                                    return (
                                        <option key={c.id} value={c.continents}>{c.continents}</option>
                                    )
                                })
                            } */}
                    </select>
                </div>
                
                <div className='sub-header-item'>
                    <label>Population: </label>
                    <select ref={refPop} onChange={(e) => {handlePopulation(e)}}>
                        <option value="default">Default</option>
                        <option value="asc">Higher</option>
                        <option value="desc">Lower</option>
                    </select>
                </div>

                <div className="sub-header-item">
                    <label>Activity: </label>
                    <select onChange={(e) => {filterByActivitie(e)}}>
                        <option value="default">Default</option>
                        {
                            activities.map((a)=> {
                                return (
                                    <option key={a} value={a}>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="sub-header-item">
                    <button onClick={(e) => handleReset(e)}>Reset Filters</button>
                </div>

                <div className="sub-header-item">
                    <Link to="/Activity"><button>Create Activity!</button></Link>
                </div>

                <div className='sub-header-item'>
                    <SearchBar paginado={paginado} />
                </div>
            </header>

            <Pagination 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />

            <div className='card-grid'>
                {
                    currentCountry && currentCountry.map( el => (
                        <Card
                            image={el.image}
                            id={el.id}
                            name={el.name}
                            continents={el.continents}
                            key={el.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default Home;