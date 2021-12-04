import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom"
const LeftSidebar = () => {
    useEffect(()=>{
        // jqueryApp();
    },[]);
    const hrefjavascript=(e)=>{
        e.preventDefault();
    }
    return ( 
    <div className="left side-menu">
        <div className="sidebar-inner slimscrollleft">
            <div className="user-details">
                <div className="pull-left">
                    <img src="http://localhost:3000/assets/images/users/avatar-1.jpg" alt="" className="thumb-md rounded-circle" />
                </div>
                <div className="user-info">
                    <div className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            John Doe
                        </a>
                        <ul className="dropdown-menu">
                            <li><a onClick={hrefjavascript} href="#" className="dropdown-item"><i
                                        className="md md-face-unlock mr-2"></i> Profile<div className="ripple-wrapper">
                                    </div></a></li>
                            <li><a onClick={hrefjavascript} href="#" className="dropdown-item"><i
                                        className="md md-settings mr-2"></i> Settings</a></li>
                            <li><a onClick={hrefjavascript} href="#" className="dropdown-item"><i className="md md-lock mr-2"></i>
                                    Lock screen</a></li>
                            <li><a onClick={hrefjavascript} href="#" className="dropdown-item"><i
                                        className="md md-settings-power mr-2"></i> Logout</a></li>
                        </ul>
                    </div>

                    <p className="text-muted m-0">Administrator</p>
                </div>
            </div>
           
            <div id="sidebar-menu">
                <ul>
                    <li>
                        <Link to="/" className="waves-effect"><i className="md md-home"></i><span> Dashboard
                            </span></Link>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-mail"></i><span> Purchase </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/purchase/new">New Purchase</Link></li>
                            <li><Link to="/purchase/list">Purchase List</Link></li>
                        </ul>
                    </li>
                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-palette"></i> <span> Purchase Return </span> <span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/purchasereturn/new">New Purchase Return</Link></li>
                            <li><Link to="/purchasereturn/list">Purchase Return List</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-invert-colors-on"></i><span> Sales
                            </span><span className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/sales/new">New Sale</Link></li>
                            <li><Link to="/sales/list">All Sales</Link></li>
                        </ul>
                    </li>
                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-invert-colors-on"></i><span> Sales Return
                            </span><span className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/salesreturn/new">New Sale Return</Link></li>
                            <li><Link to="/salesreturn/list">All Sales Return</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-redeem"></i> <span> Dispatch </span> <span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/dispatch/new">New Dispatch</Link></li>
                            <li><Link to="/dispatch/list">All Dispatch</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-now-widgets"></i><span> Inventory </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/a/new">New Dispatch</Link></li>
                            <li><Link to="/a/list">All Dispatch</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-view-list"></i><span> Basic Settings </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/brands">Brands</Link></li>
                            <li><Link to="/categories">Category</Link></li>
                            <li><Link to="/companies">Company</Link></li>
                            <li><Link to="/genders">Gender</Link></li>
                            <li><Link to="/countries">Country</Link></li>
                            <li><Link to="/cities">City</Link></li>
                            <li><Link to="/warehouses">Warehouse</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-poll"></i><span> Reports </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/a1/new">New Dispatch</Link></li>
                            <li><Link to="/a1/list">All Dispatch</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-place"></i><span> Users </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/aa/new">New Dispatch</Link></li>
                            <li><Link to="/aa/list">All Dispatch</Link></li>
                        </ul>
                    </li>

                    <li className="has_sub">
                        <a href="#" className="waves-effect"><i className="md md-pages"></i><span> Products </span><span
                                className="pull-right"><i className="md md-add"></i></span></a>
                        <ul className="list-unstyled">
                            <li><Link to="/product/new">New Product</Link></li>
                            <li><Link to="/product/list">All Products</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>
            <div className="clearfix"></div>
        </div>
    </div>
     );
}
 
export default LeftSidebar;