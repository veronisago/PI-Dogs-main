import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const LOADING = "LOADING";
export const REMOVE_DOG = "REMOVE_DOG";


export function getDogs(params) {
    return async function (dispatch) {
        dispatch({ type: LOADING, payload: true })
        var json = await axios.get('http://localhost:3001/dogs', { params })
        dispatch({ type: GET_ALL_DOGS, payload: json.data })
        dispatch({ type: LOADING, payload: false })
    }
}


export function getDogDetail(id) {
    return async function (dispatch) {
        dispatch({ type: LOADING, payload: true })
        var json = await axios.get(`http://localhost:3001/dogs/${id}`)
        dispatch({ type: GET_DOG_DETAIL, payload: json.data })
        dispatch({ type: LOADING, payload: false })
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        var response = await axios.post('http://localhost:3001/dogs', payload)
        return response;
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments')
        dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
}
