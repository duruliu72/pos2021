import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';
import companyReducer from './companyReducer';
import genderReducer from './genderReducer';
import countryReducer from './countryReducer';
import cityReducer from './cityReducer';
import warehouseReducer from './warehouseReducer';
export default combineReducers({
    article:articleReducer,
    brand:brandReducer,
    category:categoryReducer,
    company:companyReducer,
    gender:genderReducer,
    country:countryReducer,
    city:cityReducer,
    warehouse:warehouseReducer,
});
