import { apiUrl } from "../config.json";
// Action 
const NEW_ARTICLE="NEW_ARTICLE";
const LOAD_ARTICLES="LOAD_ARTICLES";
const IS_LODDING="IS_LODDING";
// Action Creator 
export const fetchArticles=() =>{
    return (dispatch,getState)=>{
        dispatch({
            type: IS_LODDING,
            payload: true
        });
        fetch(apiUrl+'/articles')
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: LOAD_ARTICLES,
                payload: json
            });
        })
        .catch((ex) => {
            console.log("fetchArticles_ex", ex);
            dispatch({
                type: IS_LODDING,
                payload: false,
            });
        });
    };
}
const initialState = {
    articles: [],
    isLoading: false,
}
const articleReducer = function (state = initialState, action) {
    switch(action.type) {
        case NEW_ARTICLE:
            return {
                ...state,
                articles:[action.payload,...state.articles]
            }
        case LOAD_ARTICLES:
            return {
                ...state,
                articles:action.payload,
                isLoading:false
            }
        case IS_LODDING:
            return {
                ...state,
                isLoading:true
            }
        default:
            return state   
    }
}
export default articleReducer;
export const getLoadingStatus = (state) => {
    return state.entities.article.isLoading;
}

export const getArticles = (state) => {
    return state.entities.article.articles;
}