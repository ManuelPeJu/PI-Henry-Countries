import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCountriesByName } from '../redux/actions'
import "./CSS/Header.css"

const SearchBar = ({paginado}) => {
    const dispatch = useDispatch(); // para usar el useDispatch directamente
    const [name, setName] = useState(""); // seteamos el estado de name

    function handleInputChange(e) {
        setName(e.target.value); // seteamos el estado de name a lo que queramos
        // console.log(name) 
    }

    function handleSubmit(e) {
        e.preventDefault();// en caso de fallo no continua ejecutando
        dispatch(getCountriesByName(name)); // despachamos la action a traves del store con el estado de name que queremos
        setName(""); // setea nuevamente el name en ""
        paginado(1); // nos pone en la pagina 1 para no liarnos entre páginas
    };

    return (
        <div>
            <input 
                className='search-bar'
                type="Text"
                placeholder="Search Country..."
                onChange={(e) => handleInputChange(e)}
                value={name}
                maxLength="300"
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search a country</button>
        </div>
    )
}

export default SearchBar;