import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Product = () => {
    const [article,setArticle]=useState({
        company_id:"",
        articleCode:"",
        articleName:"",
        brand_id:"",
        category_id:"",
        gender_id:"",
        articleType_id:""
    });
    let handleChange=(e) => {

    }
    let submitArticle=(e) => {

    }
    return ( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Create Product</h4>
                        <ol className="breadcrumb pull-right">
                            <li><a href="#">Beauty4Me</a></li>
                            <li className="active">Create Product</li>
                        </ol>
                    </div>
                </div>  
                <form onSubmit={submitArticle}>
                    <div className="row">
                        <div className="col-xl-12">                  
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="company_id">Company</label>
                                            <input type="text" name="company_id" onChange={handleChange} value={article.company_id} className="form-control" id="company_id" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleCode">Product Code</label>
                                            <input type="text" name="articleCode" onChange={handleChange} value={article.articleCode} className="form-control" id="articleCode" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleName">Product Name</label>
                                            <input type="text" name="articleName" onChange={handleChange} value={article.articleName} className="form-control" id="articleName" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="brand">Brand</label>
                                            <input type="text" name="brand_id" onChange={handleChange} value={article.brand_id} className="form-control" id="brand" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="category">Category</label>
                                            <input type="text" name="category_id" onChange={handleChange} value={article.category_id} className="form-control" id="category" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="gender">Gender</label>
                                            <input type="text" name="gender_id" onChange={handleChange} value={article.gender_id} className="form-control" id="gender" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleType_id">Product Type</label>
                                            <input type="text" name="articleType_id" onChange={handleChange} value={article.articleType_id} className="form-control" id="articleType_id" />
                                        </div>
                                    </div>                                   
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleInputPassword1">Note</label>
                                            <textarea className="form-control" rows="5" id="example-textarea-input"></textarea>
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
 
export default Product;