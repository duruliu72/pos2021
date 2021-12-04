import React, { useEffect, useState } from 'react';
import {pageJs} from '../../services/utilityService';
import $ from 'jquery'
const CreatePurchase = () => {
    useEffect(() => {
        pageJs("Purchase");
    }, [])
    return ( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Create Purchase</h4>
                        <ol className="breadcrumb pull-right">
                            <li><a href="#">Beauty4Me</a></li>
                            <li className="active">Create Purchase</li>
                        </ol>
                    </div>
                </div>  
                <form>
                    <div className="row">
                        <div className="col-xl-12">                  
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputEmail1">Date</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="mm/dd/yyyy" id="datepicker"></input>
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="md md-event"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputPassword1">Company</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Company" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputEmail1">Supplier</label>
                                            <select className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputEmail1">Warehouse</label>
                                            <select className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div> 
                        </div>
                        <div className="col-xl-12">                  
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Order Product items</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Search Products"/>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                    <th>Age</th>
                                                    <th>City</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td>20</td>
                                                    <td>Cityname</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                    <td>20</td>
                                                    <td>Cityname</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                    <td>20</td>
                                                    <td>Cityname</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Steve</td>
                                                    <td>Mac Queen</td>
                                                    <td>@steve</td>
                                                    <td>20</td>
                                                    <td>Cityname</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">                  
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Other Information</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleInputPassword1">Order Tax</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Order Tax" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleInputPassword1">Discount</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Discount" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleInputPassword1">Shipping Cost</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Shipping Cost" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="exampleInputPassword1">Status</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Status" />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="exampleInputPassword1">Note</label>
                                            <textarea className="form-control" rows="5" id="example-textarea-input"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-purple waves-effect waves-light">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default CreatePurchase;