import axios from "axios"

export function getCountries() {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        });
    }
};

export function getActivities() {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: "GET_ACTIVITIES",
            payload: json.data
        })
    }
}

export function filterByActivity(payload) {
    return function(dispatch) {
        return dispatch({
            type: "FILTER_BY_ACTIVITY",
            payload
        })
    }
}

export function getCountriesByName(payload) {
    return async function(dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/countries?name=" + payload);
            return dispatch({
                type:"GET_COUNTRIES_BY_NAME",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};


export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByPopulation(payload) {
    return {
        type: "ORDER_BY_POPULATION",
        payload
    }
}

export function FilterByContinent(payload) {
    return {
        type: "SELECT_CONTINENT",
        payload
    }
};

export function postActivities(payload) {
    return async function(dispatch) {
        let response = await axios.post("http://localhost:3001/activities", payload);
        return response
    }
}

export function getDetail(payload) {
    return async function(dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/countries/" + payload);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function resetDetail() {
	return ({
	type: "RESET_DETAIL"	
	})
}