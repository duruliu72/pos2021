import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/company';
import axios from 'axios';
import { apiUrl } from "../../config.json";
import {toast } from 'react-toastify';
const CreateCompany = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    const bean={
        companyCode:"",
        companyName:"",
        companyCountry:"",
        companyCity:"",
        companyAddress:"",
        companyEmail:"",
        companyPhone:"",
        description:"",
        imageUrl:"",
    };
    const [company,setCompany] =useState(bean);
    const [errors, setErrors] = useState({});
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        company[event.currentTarget.name]=event.currentTarget.value;
        setCompany({...company});
    }
    const handleFileChange=(event)=>{
        company[event.currentTarget.name]=event.target.files[0];
        setCompany({...company});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate({
            companyCode:company.companyCode,
            companyName:company.companyName,
            companyCountry:company.companyCountry,
            companyCity:company.companyCity,
            companyAddress:company.companyAddress,
            companyEmail:company.companyEmail,
            companyPhone:company.companyPhone,
            description:company.description
        });
        setErrors(errorsCopy);
        const fd = new FormData()
        fd.append('companyCode',company.companyCode);
        fd.append('companyName',company.companyName);
        fd.append('companyCountry',company.companyCountry);
        fd.append('companyCity',company.companyCity);
        fd.append('companyAddress',company.companyAddress);
        fd.append('companyEmail',company.companyEmail);
        fd.append('companyPhone',company.companyPhone);
        fd.append('imageUrl',company.imageUrl);
        fd.append('description',company.description);
        axios.post(apiUrl + "/companies", fd)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_COMPANY",
                 payload: res,
             });
             setCompany(bean);
             imageUrl.current.value="";
             toast("COMPANY CREATED.");
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
                        <h4 className="pull-left page-title">Create Company</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/companies">Companies</Link></li>
                            <li className="active">Create Company</li>
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
                                            <label htmlFor="companyCode">Company Code</label>
                                            <input type="text" name="companyCode" onChange={handleChange} value={company.companyCode} className="form-control" id="companyCode" />
                                            {(errors && errors.companyCode) && <span style={{color:"red"}}>{errors.companyCode}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyName">Company Name</label>
                                            <input type="text" name="companyName" onChange={handleChange} value={company.companyName} className="form-control" id="companyName" />
                                            {(errors && errors.companyName) && <span style={{color:"red"}}>{errors.companyName}</span>}
                                        </div>
                                    </div>                                  
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyCountry">Company Country</label>
                                            <input type="text" name="companyCountry" onChange={handleChange} value={company.companyCountry} className="form-control" id="companyCountry" />
                                            {(errors && errors.companyCountry) && <span style={{color:"red"}}>{errors.companyCountry}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyCity">Company City</label>
                                            <input type="text" name="companyCity" onChange={handleChange} value={company.companyCity} className="form-control" id="companyCity" />
                                            {(errors && errors.companyCity) && <span style={{color:"red"}}>{errors.companyCity}</span>}
                                        </div>
                                    </div>                                  
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyAddress">Company Address</label>
                                            <input type="text" name="companyAddress" onChange={handleChange} value={company.companyAddress} className="form-control" id="companyAddress" />
                                            {(errors && errors.companyAddress) && <span style={{color:"red"}}>{errors.companyAddress}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyEmail">Company Email</label>
                                            <input type="text" name="companyEmail" onChange={handleChange} value={company.companyEmail} className="form-control" id="companyEmail" />
                                            {(errors && errors.companyEmail) && <span style={{color:"red"}}>{errors.companyEmail}</span>}
                                        </div>
                                    </div>                                  
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyPhone">Company Phone</label>
                                            <input type="text" name="companyPhone" onChange={handleChange} value={company.companyPhone} className="form-control" id="companyPhone" />
                                            {(errors && errors.companyPhone) && <span style={{color:"red"}}>{errors.companyPhone}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="imageUrl">Featured Image</label>
                                            <input type="file" name="imageUrl" onChange={handleFileChange} ref={imageUrl} className="form-control" id="imageUrl" />
                                        </div>
                                    </div>                                  
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="description">Note</label>
                                            <textarea name="description" onChange={handleChange} value={company.description} className="form-control" rows="3" id="description"></textarea>
                                            {(errors && errors.description) && <span style={{color:"red"}}>{errors.description}</span>}
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
 
export default CreateCompany;