import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_CITY="NEW_CITY";
const UPDATE_CITY="UPDATE_CITY";
const DELETE_CITY="DELETE_CITY";
const LOAD_CITY="LOAD_CITY";
// Action Creator 
export const fetchCities=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/cities")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_CITY,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchCities_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    cities: [],
}
const cityReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_CITY:
            return {
                ...state,
                cities:[action.payload,...state.cities]
            }
        case UPDATE_CITY:
            return {
                ...state,
                cities: [...state.cities].map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return {
                            ...item,
                            ...action.payload,
                        }
                    }
                })
            }
        case DELETE_CITY:
            return {
                ...state,
                cities: [...state.cities].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_CITY:
            return {
                ...state,
                cities: action.payload
            }
        default:
            return state;
    }
}

export default cityReducer;
export const getCities=(state)=>{
    return state.entities.city.cities;
};
export const getCity=(state,cityid)=>{
    return state.entities.city.cities.find((item)=>item.id==cityid);
};