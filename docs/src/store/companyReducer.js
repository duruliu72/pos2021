import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_COMPANY="NEW_COMPANY";
const UPDATE_COMPANY="UPDATE_COMPANY";
const DELETE_COMPANY="DELETE_COMPANY";
const LOAD_COMPANY="LOAD_COMPANY";
// Action Creator 
export const fetchCompanies=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/companies")
        .then(({data:json}) => {
            console.log("json",json)
            dispatch({
                type: LOAD_COMPANY,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchCompanies_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    companies: [],
}
const companyReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_COMPANY:
            return {
                ...state,
                companies:[action.payload,...state.companies]
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                companies: [...state.companies].map((item) => {
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
        case DELETE_COMPANY:
            return {
                ...state,
                companies: [...state.companies].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_COMPANY:
            return {
                ...state,
                companies: action.payload
            }
        default:
            return state;
    }
}

export default companyReducer;
export const getCompanies=(state)=>{
    return state.entities.company.companies;
};
export const getCompany=(state,companyid)=>{
    return state.entities.company.companies.find((brand)=>brand.id==companyid);
};