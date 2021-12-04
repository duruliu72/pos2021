import React, { useEffect, useState,useRef } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/category';
import axios from 'axios';
import { apiUrl } from "../../config.json";
import {toast } from 'react-toastify';
const CreateCategory = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    const bean={
        name:"",
        description:"",
        imageUrl:"",
    };
    const [category,setCategory] =useState(bean);
    const [errors, setErrors] = useState({});
    let handleChange=(event) => {
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(event.currentTarget);
        if (errorMessage) errorsCopy[event.currentTarget.name] = errorMessage;
        else delete errorsCopy[event.currentTarget.name];
        setErrors(errorsCopy);
        category[event.currentTarget.name]=event.currentTarget.value;
        setCategory({...category});
    }
    const handleFileChange=(event)=>{
        category[event.currentTarget.name]=event.target.files[0];
        setCategory({...category});
    }
    let handleSubmit=(e) => {
        e.preventDefault();
        const errorsCopy = validate({name:category.name,description:category.description});
        setErrors(errorsCopy);
        const fd = new FormData()
        fd.append('name',category.name);
        fd.append('imageUrl',category.imageUrl);
        fd.append('description',category.description);
        axios.post(apiUrl + "/categories", fd)
        .then(({data:res}) => {
             dispatch({
                 type:"NEW_CATEGORY",
                 payload: res,
             });
             setCategory(bean);
             imageUrl.current.value="";
             toast("NEW CATEGORY CREATED.");
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
                        <h4 className="pull-left page-title">Create Category</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/categories">categories</Link></li>
                            <li className="active">Create Category</li>
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
                                            <input type="text" name="name" onChange={handleChange} value={category.name} className="form-control" id="name" />
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
                                            <textarea name="description" onChange={handleChange} value={category.description} className="form-control" rows="3" id="description"></textarea>
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
 
export default CreateCategory;