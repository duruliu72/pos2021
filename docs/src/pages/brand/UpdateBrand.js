import React, { useEffect, useState,useRef } from 'react';
import {Link, useParams} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { validate, validateProperty } from '../../models/brand';
import axios from 'axios';
import {toast } from 'react-toastify';
import {getBrand } from "../../store/brandReducer";
const UpdateBrand = () => {
    const dispatch = useDispatch();
    const imageUrl=useRef();
    let { brandid } = useParams();
    const findBrand=useSelector((state) => {
        return getBrand(state,brandid);
    });
    const bean={
        id:"",
        name:"",
        description:"",
        imageUrl:"",
    };
    const [brand,setBrand] =useState(bean);
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        if(findBrand){
            setBrand(findBrand);
        }
    },[findBrand]);
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
        axios.put("http://localhost:8080/api/brands/"+brand.id, data)
        .then(({data:res}) => {
            console.log("UPDATE_BRAND",res);
             dispatch({
                 type:"UPDATE_BRAND",
                 payload: res,
             });
            //  setBrand(bean);
             imageUrl.current.value="";
             toast("BRAND UPDATED.");
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
                        <h4 className="pull-left page-title">Updated Brand</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me {brandid}</Link></li>
                            <li><Link to="/brands">Brands</Link></li>
                            <li className="active">Updated Brand</li>
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
 
export default UpdateBrand;