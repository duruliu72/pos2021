import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from "./reducer";

const middlewareEnhancer = applyMiddleware(thunk);
export default function () {
    return createStore(reducer, middlewareEnhancer);
}