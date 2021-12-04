import React, { useEffect, useState } from 'react';
import {pageJs} from '../services/utilityService';
import $ from 'jquery'
const Home = () => {
    useEffect(() =>{
        pageJs("Home");
    },[])
    const hrefjavascript=(e)=>{
        e.preventDefault();
    }
    return ( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Welcome !</h4>
                        <ol className="breadcrumb pull-right">
                            <li><a href="#">Beauty4Me</a></li>
                            <li className="active">Dashboard</li>
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xl-3">
                        <div className="mini-stat clearfix bx-shadow bg-white">
                            <span className="mini-stat-icon bg-info"><i className="ion-social-usd"></i></span>
                            <div className="mini-stat-info text-right text-dark">
                                <span className="counter text-dark">15852</span>
                                Total Sales
                            </div>
                            <div className="tiles-progress">
                                <div className="m-t-20">
                                    <h5 className="text-uppercase">Target <span className="pull-right">60%</span></h5>
                                    <div className="progress progress-sm m-0">
                                        <div className="progress-bar progress-bar-info" role="progressbar"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                            style={{width:"60%"}}>
                                            <span className="sr-only">60% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="mini-stat clearfix bx-shadow bg-white">
                            <span className="mini-stat-icon bg-purple"><i className="ion-ios7-cart"></i></span>
                            <div className="mini-stat-info text-right text-dark">
                                <span className="counter text-dark">956</span>
                                New Orders
                            </div>
                            <div className="tiles-progress">
                                <div className="m-t-20">
                                    <h5 className="text-uppercase">Target <span className="pull-right">90%</span></h5>
                                    <div className="progress progress-sm m-0">
                                        <div className="progress-bar progress-bar-purple" role="progressbar"
                                            aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
                                            style={{width:"90%"}}>
                                            <span className="sr-only">90% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="mini-stat clearfix bx-shadow bg-white">
                            <span className="mini-stat-icon bg-success"><i className="ion-android-contacts"></i></span>
                            <div className="mini-stat-info text-right text-dark">
                                <span className="counter text-dark">5210</span>
                                New Users
                            </div>
                            <div className="tiles-progress">
                                <div className="m-t-20">
                                    <h5 className="text-uppercase">Target <span className="pull-right">57%</span></h5>
                                    <div className="progress progress-sm m-0">
                                        <div className="progress-bar progress-bar-success" role="progressbar"
                                            aria-valuenow="57" aria-valuemin="0" aria-valuemax="100"
                                            style={{width:"57%"}}>
                                            <span className="sr-only">57% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="mini-stat clearfix bx-shadow bg-white">
                            <span className="mini-stat-icon bg-primary"><i className="ion-eye"></i></span>
                            <div className="mini-stat-info text-right text-dark">
                                <span className="counter text-dark">20544</span>
                                Unique Visitors
                            </div>
                            <div className="tiles-progress">
                                <div className="m-t-20">
                                    <h5 className="text-uppercase">Target <span className="pull-right">60%</span></h5>
                                    <div className="progress progress-sm m-0">
                                        <div className="progress-bar progress-bar-primary" role="progressbar"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                            style={{width:"60%"}}>
                                            <span className="sr-only">60% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="portlet">
                            <div className="portlet-heading">
                                <h3 className="portlet-title text-dark text-uppercase">
                                    Website Stats
                                </h3>
                                <div className="portlet-widgets">
                                    <a onClick={hrefjavascript} href="#" data-toggle="reload"><i className="ion-refresh"></i></a>
                                    <span className="divider"></span>
                                    <a data-toggle="collapse" href="#portlet1"><i className="ion-minus-round"></i></a>
                                    <span className="divider"></span>
                                    <a href="#" data-toggle="remove"><i className="ion-close-round"></i></a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div id="portlet1" className="panel-collapse collapse show">
                                <div className="portlet-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div id="website-stats" style={{position: "relative",height: "320px"}}></div>
                                            <div className="row text-center m-t-30">
                                                <div className="col-sm-4">
                                                    <h4 className="counter">86,956</h4>
                                                    <small className="text-muted"> Weekly Report</small>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h4 className="counter">86,69</h4>
                                                    <small className="text-muted">Monthly Report</small>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h4 className="counter">948,16</h4>
                                                    <small className="text-muted">Yearly Report</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div className="col-xl-4">
                        <div className="portlet">
                            
                            <div className="portlet-heading">
                                <h3 className="portlet-title text-dark text-uppercase">
                                    Website Stats
                                </h3>
                                <div className="portlet-widgets">
                                    <a onClick={hrefjavascript} href="#" data-toggle="reload"><i className="ion-refresh"></i></a>
                                    <span className="divider"></span>
                                    <a data-toggle="collapse" href="#portlet2"><i className="ion-minus-round"></i></a>
                                    <span className="divider"></span>
                                    <a href="#" data-toggle="remove"><i className="ion-close-round"></i></a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div id="portlet2" className="panel-collapse collapse show">
                                <div className="portlet-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div id="pie-chart">
                                                <div id="pie-chart-container" className="flot-chart"
                                                    style={{height: "320px"}}>
                                                </div>
                                            </div>

                                            <div className="row text-center m-t-30">
                                                <div className="col-sm-6">
                                                    <h4 className="counter">86,956</h4>
                                                    <small className="text-muted"> Weekly Report</small>
                                                </div>
                                                <div className="col-sm-6">
                                                    <h4 className="counter">86,69</h4>
                                                    <small className="text-muted">Monthly Report</small>
                                                </div>
                                            </div>
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
 
export default Home;