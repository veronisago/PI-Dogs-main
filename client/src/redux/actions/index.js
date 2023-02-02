import axios from 'axios';
const {
    REACT_APP_BASE_URL
  } = process.env;

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const LOADING = "LOADING";


export function getDogs(params) {
    return async function (dispatch) {
        dispatch({ type: LOADING, payload: true })
        var json = await axios.get(`${REACT_APP_BASE_URL}/dogs`, { params })
        dispatch({ type: GET_ALL_DOGS, payload: json.data })
        dispatch({ type: LOADING, payload: false })
    }
}


export function getDogDetail(id) {
    return async function (dispatch) {
        dispatch({ type: LOADING, payload: true })
        var json = await axios.get(`${REACT_APP_BASE_URL}/dogs/${id}`)
        dispatch({ type: GET_DOG_DETAIL, payload: json.data })
        dispatch({ type: LOADING, payload: false })
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        var response = await axios.post(`${REACT_APP_BASE_URL}/dogs`, payload)
        return response;
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`${REACT_APP_BASE_URL}/temperaments`)
        dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
}
