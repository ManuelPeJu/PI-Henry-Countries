const initalState = {
    countries : [],
    allCountries : [],
    continent: "",
    activities: [],
    detail: [],

}

function rootReducer(state = initalState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }

        case "GET_COUNTRIES_BY_NAME":
            return {
                ...state,
                countries: action.payload
            }


        case "ORDER_BY_NAME":
            let sortedCountries = action.payload === "a-z"
            ?
            state.countries.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            :
            state.countries.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                countries: sortedCountries
            }
        
        case "ORDER_BY_POPULATION":
            // console.log(action.payload)
            let sortByPop = action.payload === "asc"
            ?
            state.countries.sort(function(a, b) {              
                if(a.population > b.population) return -1;
                if(a.population < b.population) return 1;
                return 0;
            })
            :
            state.countries.sort(function(a, b){
                if(a.population > b.population) return 1;
                if(a.population < b.population) return -1;
                return 0;
            })
            // console.log(sortByPop)
            return {
                ...state,
                countries: sortByPop
            }

        case "SELECT_CONTINENT" :
            const continentFiltered = action.payload === "All"
            ?
            state.allCountries
            :
            state.allCountries.filter((country) => 
                country.continents.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                countries: continentFiltered
            }
        case "POST_ACTIVITY":
            return {
                ...state,
                // activities: [...state.activities, action.payload]
            }
        
        case "GET_ACTIVITIES": 
            return{
                ...state,
                activities: action.payload
            }

        case "FILTER_BY_ACTIVITY": 
        console.log(state.allCountries)
        const activitiesFiltered = action.payload === "default"
        ?
        state.allCountries
        :
        state.allCountries.filter(country => 
                country.activities.find(a => a.name === action.payload)
                )
        return {
            ...state,
            countries: activitiesFiltered
        }


        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case "RESET_DETAIL":
            return{
                ...state,
                detail: {}
            }

        default:
            return state;
    }
}

export default rootReducer;


// ?
// state.countries.sort(function(a, b){
//     if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
//     if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
//     return 0;
// })
// :
// state.countries.sort(function(a, b){
//     if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
//     if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
//     return 0;
// });
// return {
//     ...state,
//     countries: sortedCountries
// }