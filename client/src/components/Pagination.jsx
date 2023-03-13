import React from 'react'

const Pagintion = ({countriesPerPage, allCountries, paginado}) => {
    const pageNumber = [];
    
    for(let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumber.push(i) // seteo let i = 1 para que la primera pagina sea 1 en lugar de 0
    } // redondea todos lospaises sobre lacantida de paises que quiero por paginas

    return (
        <nav>
            <ul>
                {
                    pageNumber && 
                        pageNumber.map(number => (
                            <button key={number} onClick={() => paginado(number)}>{number}</button>
                        )) // creo un botón por cada página de paises
                }
            </ul>
        </nav>
    )
}

export default Pagintion;