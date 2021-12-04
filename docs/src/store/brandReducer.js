import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_BRAND="NEW_BRAND";
const UPDATE_BRAND="UPDATE_BRAND";
const DELETE_BRAND="DELETE_BRAND";
const LOAD_BRANDS="LOAD_BRANDS";
// Action Creator 
export const fetchBrands=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/brands")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_BRANDS,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchBrands_ex", ex);
        });
    }     
}
export const createBrand=(bean) =>{
    return (dispatch,getState)=>{
        fetch(apiUrl + "/brands",{
            method: 'POST',
            body: JSON.stringify(bean),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then(response => response.json())
        .then(json => {
            
        })
        .catch((ex) => {
            console.log("createBrand_ex", ex);
        });
    }     
}
export const updateBrand=() =>{
    return (dispatch,getState)=>{
        fetch(apiUrl + "/brands")
        .then(response => response.json())
        .then(json => {

        })
        .catch((ex) => {
            console.log("fetchBrands_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    brands: [],
}
const brandReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_BRAND:
            return {
                ...state,
                brands:[action.payload,...state.brands]
            }
        case UPDATE_BRAND:
            return {
                ...state,
                brands: [...state.brands].map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return {
                            ...item,
                            name: action.payload.name,
                            description: action.payload.description,
                        }
                    }
                })
            }
        case DELETE_BRAND:
            return {
                ...state,
                brands: [...state.brands].filter((item) => {
                    console.log(action.payload.id);
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        default:
            return state;
    }
}

export default brandReducer;
export const getBrands=(state)=>{
    return state.entities.brand.brands;
};
export const getBrand=(state,brandid)=>{
    return state.entities.brand.brands.find((brand)=>brand.id==brandid);
};