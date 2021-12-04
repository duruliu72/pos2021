import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import {createBrand } from "../../store/brandReducer";
import { validate, validateProperty } from '../../models/brand';
import axios from 'axios';
import {toast } from 'react-toastify';
const CreateBrand = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    const bean={
        name:"",
        description:"",
        imageUrl:"",
    };
    const [brand,setBrand] =useState(bean);
    const [errors, setErrors] = useState({});
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        brand[event.currentTarget.name]=event.currentTarget.value;
        setBrand({...brand});
    }
    const handleFileChange=(event)=>{
        brand[event.currentTarget.name]=event.target.files[0];
        setBrand({...brand});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate({name:brand.name,description:brand.description});
        setErrors(errorsCopy);
        const data = new FormData()
        data.append('name',brand.name);
        data.append('imageUrl',brand.imageUrl);
        data.append('description',brand.description);
        axios.post("http://localhost:8080/api/brands", data)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_BRAND",
                 payload: res,
             });
             setBrand(bean);
             imageUrl.current.value="";
             toast("NEW BRAND CREATED.");
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
                        <h4 className="pull-left page-title">Create Brand</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/brands">Brands</Link></li>
                            <li className="active">Create Brand</li>
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
                                            <input type="text" name="name" onChange={handleChange} value={brand.name} className="form-control" id="name" />
                                            {(errors && errors.name) && <span style={{color:"red"}}>{errors.name}</span>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="imageUrl">Featured Image</label>
                                            <input type="file" name="imageUrl" onChange={handleFileChange} ref={imageUrl} className="form-control" id="imageUrl" />
                                        </div>
                                    </div>                                  
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="description">Note</label>
                                            <textarea name="description" onChange={handleChange} value={brand.description} className="form-control" rows="3" id="description"></textarea>
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
 
export default CreateBrand;