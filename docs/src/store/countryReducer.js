import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_COUNTRY="NEW_COUNTRY";
const UPDATE_COUNTRY="UPDATE_COUNTRY";
const DELETE_COUNTRY="DELETE_COUNTRY";
const LOAD_COUNTRY="LOAD_COUNTRY";
// Action Creator 
export const fetchCountries=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/countries")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_COUNTRY,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchCountries_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    countries: [],
}
const countryReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_COUNTRY:
            return {
                ...state,
                countries:[action.payload,...state.countries]
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                countries: [...state.countries].map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return {
                            ...item,
                           ...action.payload
                        }
                    }
                })
            }
        case DELETE_COUNTRY:
            return {
                ...state,
                countries: [...state.countries].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_COUNTRY:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}

export default countryReducer;
export const getCountries=(state)=>{
    return state.entities.country.countries;
};
export const getCountry=(state,countryid)=>{
    return state.entities.country.countries.find((item)=>item.id==countryid);
};