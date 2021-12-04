import React, { useEffect, useState,useRef } from 'react';
import {Link, useParams} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/city';
import axios from 'axios';
import {toast } from 'react-toastify';
import {getCity } from "../../store/cityReducer";
const UpdateCategory = () => {
    const dispatch = useDispatch();
    let { cityid } = useParams();
    const findCity =useSelector((state) => {
        return getCity(state,cityid);
    });
    const bean={
        id:cityid,
        cityName:"",
        cityCode:"",
    };
    const [city,setCity] =useState(bean);
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        if(findCity){
            setCity(findCity);
        }
    },[findCity]);
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        city[event.currentTarget.name]=event.currentTarget.value;
        setCity({...city});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate({cityName:city.cityName,cityCode:city.cityCode});
        setErrors(errorsCopy);
        axios.put("http://localhost:8080/api/cities/"+city.id, {
            cityName:city.cityName,cityCode:city.cityCode
        })
        .then(({data:res}) => {
             dispatch({
                 type:"UPDATE_CITY",
                 payload: res,
             });
             toast("CITY UPDATED.");
         })
         .catch(ex => {
            toast(ex.response.data);
         })
    }
    return ( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Updated City</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/cities">Cities</Link></li>
                            <li className="active">Updated City</li>
                        </ol>
                    </div>
                </div>  
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xl-12">                  
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="cityName">City Name</label>
                                            <input type="text" name="cityName" onChange={handleChange} value={city.cityName} className="form-control" id="cityName" />
                                            {(errors && errors.cityName) && <span style={{color:"red"}}>{errors.cityName}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="cityCode">City Code</label>
                                            <input type="text" name="cityCode" onChange={handleChange} value={city.cityCode} className="form-control" id="cityCode" />
                                            {(errors && errors.cityCode) && <span style={{color:"red"}}>{errors.cityCode}</span>}
                                        </div>
                                    </div>                                  
                                    <button type="submit" className="btn btn-purple waves-effect waves-light">Submit</button>
                                </div>
                            </div> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default UpdateCategory;