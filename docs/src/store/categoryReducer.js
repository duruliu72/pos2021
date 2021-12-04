import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_CATEGORY="NEW_CATEGORY";
const UPDATE_CATEGORY="UPDATE_CATEGORY";
const DELETE_CATEGORY="DELETE_CATEGORY";
const LOAD_CATEGORY="LOAD_CATEGORY";
// Action Creator 
export const fetchCategories=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/categories")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_CATEGORY,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchCategories_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    categories: [],
}
const categoryReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_CATEGORY:
            return {
                ...state,
                categories:[action.payload,...state.categories]
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories].map((item) => {
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
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;
export const getCategories=(state)=>{
    return state.entities.category.categories;
};
export const getCategory=(state,categoryid)=>{
    return state.entities.category.categories.find((brand)=>brand.id==categoryid);
};