import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/warehouse';
import axios from 'axios';
import { apiUrl } from "../../config.json";
import {toast } from 'react-toastify';
const CreateWarehouse = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    const bean={
        warehouseCode:"",
        warehouseName:"",
        country_id:"",
        city_id:"",
        warehouseAddress:"",
    };
    const [country,setCountry] =useState(bean);
    const [errors, setErrors] = useState({});
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        country[event.currentTarget.name]=event.currentTarget.value;
        setCountry({...country});
    }
    const handleFileChange=(event)=>{
        country[event.currentTarget.name]=event.target.files[0];
        setCountry({...country});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate({countryCode:country.countryCode,countryName:country.countryName});
        setErrors(errorsCopy);
        axios.post(apiUrl + "/countries", country)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_COUNTRY",
                 payload: res,
             });
             setCountry(bean);
             toast("COUNTRY CREATED.");
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
                        <h4 className="pull-left page-title">Create Warehouse</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/warehouses">Countries</Link></li>
                            <li className="active">Create Warehouse</li>
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
                                            <label htmlFor="countryName">Country Name</label>
                                            <input type="text" name="countryName" onChange={handleChange} value={country.countryName} className="form-control" id="countryName" />
                                            {(errors && errors.countryName) && <span style={{color:"red"}}>{errors.countryName}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="countryCode">Country Code</label>
                                            <input type="text" name="countryCode" onChange={handleChange} value={country.countryCode} className="form-control" id="countryCode" />
                                            {(errors && errors.countryCode) && <span style={{color:"red"}}>{errors.countryCode}</span>}
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
 
export default CreateWarehouse;