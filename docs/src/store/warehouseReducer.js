import { apiUrl } from "../config.json";
import axios from 'axios';
// Action 
const NEW_WAREHOUSE="NEW_WAREHOUSE";
const UPDATE_WAREHOUSE="UPDATE_WAREHOUSE";
const DELETE_WAREHOUSE="DELETE_WAREHOUSE";
const LOAD_WAREHOUSE="LOAD_WAREHOUSE";
// Action Creator 
export const fetchWarehouses=() =>{
    return (dispatch,getState)=>{
        axios.get(apiUrl + "/warehouses")
        .then(({data:json}) => {
            dispatch({
                type: LOAD_WAREHOUSE,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchWarehouses_ex", ex);
        });
    }     
}
// Reducer 
const initialState = {
    warehouses: [],
}
const warehousesReducer =function(state= initialState,action){
    switch(action.type){
        case NEW_WAREHOUSE:
            return {
                ...state,
                warehouses:[action.payload,...state.warehouses]
            }
        case UPDATE_WAREHOUSE:
            return {
                ...state,
                warehouses: [...state.warehouses].map((item) => {
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
        case DELETE_WAREHOUSE:
            return {
                ...state,
                warehouses: [...state.warehouses].filter((item) => {
                    if (item.id !== action.payload.id) {
                        return true;
                    }
                    return false;
                })
            }
        case LOAD_WAREHOUSE:
            return {
                ...state,
                warehouses: action.payload
            }
        default:
            return state;
    }
}

export default warehousesReducer;
export const getWarehouses=(state)=>{
    return state.entities.warehouse.warehouses;
};
export const getWarehouse=(state,warehouseid)=>{
    return state.entities.warehouse.warehouses.find((item)=>item.id==warehouseid);
};