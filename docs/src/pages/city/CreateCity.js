import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/city';
import axios from 'axios';
import { apiUrl } from "../../config.json";
import {toast } from 'react-toastify';
const CreateCity = () => {
    const dispatch = useDispatch();
    const bean={
        cityName:"",
        cityCode:"",
    };
    const [city,setCity] =useState(bean);
    const [errors, setErrors] = useState({});
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
        axios.post(apiUrl + "/cities", city)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_CITY",
                 payload: res,
             });
             setCity(bean);
             toast("CITY CREATED.");
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
                        <h4 className="pull-left page-title">Create City</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/cities">Cities</Link></li>
                            <li className="active">Create City</li>
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
 
export default CreateCity;