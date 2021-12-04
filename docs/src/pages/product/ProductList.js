
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";
import {getArticles } from "../../store/articleReducer";
const ProductList = () => {
    const articles = useSelector((state) => {
        return getArticles(state);
    });
    return ( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Article LIST</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/product/new">Create Article</Link></li>
                            {/* <li><a href="#">Forms</a></li>
                            <li className="active">Article LIST</li> */}
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="dataTables_length">
                                            <label>Show 
                                                <select className="custom-select custom-select-sm form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> entries
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap" style={{borderCollapse:"collapse",borderSpacing:"0",width:"100%"}}>
                                        <thead>
                                            <tr>
                                                <th className="text-center"><input type="checkbox"></input></th>
                                                <th>Article Code</th>
                                                <th>Article Name</th>
                                                <th>Brand</th>
                                                <th>Category</th>
                                                <th>Gender</th>
                                                <th>Article Type</th>
                                                <th className="text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                articles.map((item,index) => {
                                                    return <tr key={index}>
                                                <td className="text-center"><input type="checkbox"></input></td>
                                                <td>{item.articleCode}</td>
                                                <td>{item.articleName}</td>
                                                <td>{item.brand_id}</td>
                                                <td>{item.category_id}</td>
                                                <td>{item.gender_id}</td>
                                                <td>{item.articleType_id}</td>
                                                <td className="text-right dropleft">
                                                    <i style={{cursor: "pointer",fontSize:"20px"}} className="ion-android-more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div className="dropdown-menu">
                                                        <div className="card" style={{width: "18rem"}}>
                                                            <ul className="list-group list-group-flush">
                                                                <li className="list-group-item">Cras justo odio</li>
                                                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                                                <li className="list-group-item">Vestibulum at eros</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-5">
                                        <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">
                                            Showing 1 to 10 of 57 entries
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                                            <ul className="pagination">
                                                <li className="paginate_button page-item previous disabled" id="datatable_previous">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                                                </li>
                                                <li className="paginate_button page-item active">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="2" tabIndex="0" className="page-link">2</a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="3" tabIndex="0" className="page-link">3</a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="4" tabIndex="0" className="page-link">4</a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="5" tabIndex="0" className="page-link">5</a>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="6" tabIndex="0" className="page-link">6</a>
                                                </li>
                                                <li className="paginate_button page-item next" id="datatable_next">
                                                    <a href="#" aria-controls="datatable" data-dt-idx="7" tabIndex="0" className="page-link">Next</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProductList;