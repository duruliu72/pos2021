import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/gender';
import axios from 'axios';
import { apiUrl } from "../../config.json";
import {toast } from 'react-toastify';
const CreateGender = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    const bean={
        name:""
    };
    const [gender,setGender] =useState(bean);
    const [errors, setErrors] = useState({});
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        gender[event.currentTarget.name]=event.currentTarget.value;
        setGender({...gender});
    }
    const handleFileChange=(event)=>{
        gender[event.currentTarget.name]=event.target.files[0];
        setGender({...gender});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate(gender);
        setErrors(errorsCopy);
        axios.post(apiUrl + "/genders", gender)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_GENDER",
                 payload: res,
             });
             setGender(bean);
             toast("GENDER CREATED.");
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
                        <h4 className="pull-left page-title">Create Gender</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/genders">Genders</Link></li>
                            <li className="active">Create Gender</li>
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
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="name" onChange={handleChange} value={gender.name} className="form-control" id="name" />
                                            {(errors && errors.name) && <span style={{color:"red"}}>{errors.name}</span>}
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
 
export default CreateGender;