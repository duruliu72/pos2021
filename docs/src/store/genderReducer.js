import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_GENDER="NEW_GENDER";
const UPDATE_GENDER="UPDATE_GENDER";
const DELETE_GENDER="DELETE_GENDER";
const LOAD_GENDER="LOAD_GENDER";
// Action Creator 
export const fetchGenders=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/genders")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_GENDER,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchGenders_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    genders: [],
}
const genderReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_GENDER:
            return {
                ...state,
                genders:[action.payload,...state.genders]
            }
        case UPDATE_GENDER:
            return {
                ...state,
                genders: [...state.genders].map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return {
                            ...item,
                            name: action.payload.name,
                        }
                    }
                })
            }
        case DELETE_GENDER:
            return {
                ...state,
                genders: [...state.genders].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_GENDER:
            return {
                ...state,
                genders: action.payload
            }
        default:
            return state;
    }
}

export default genderReducer;
export const getGenders=(state)=>{
    return state.entities.gender.genders;
};
export const getGender=(state,genderid)=>{
    return state.entities.gender.genders.find((brand)=>brand.id==genderid);
};