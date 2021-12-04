import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useDispatch } from "react-redux";
import Topbar from "./component/header/Topbar";
import LeftSidebar from "./component/sidebar/LeftSidebar";
import RightSidebar from "./component/sidebar/RightSidebar";
import Home from "./pages/Home";
import Purchase from "./pages/purchase/CreatePurchase";
import PurchaseList from "./pages/purchase/PurchaseList";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";
import PurchaseReturnList from "./pages/purchase/PurchaseReturnList";
import NewSale from "./pages/sales/NewSale";
import SaleList from "./pages/sales/SaleList";
import CreateProduct from "./pages/product/CreateProduct";
import ProductList from "./pages/product/ProductList";
import BrandList from "./pages/brand/BrandList";
import CreateBrand from "./pages/brand/CreateBrand";
import UpdateBrand from "./pages/brand/UpdateBrand";
import CategoryList from "./pages/category/CategoryList";
import CreateCategory from "./pages/category/CreateCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import CompanyList from "./pages/company/CompanyList";
import CreateCompany from "./pages/company/CreateCompany";
import UpdateCompany from "./pages/company/UpdateCompany";
import GenderList from "./pages/gender/GenderList";
import CreateGender from "./pages/gender/CreateGender";
import UpdateGender from "./pages/gender/UpdateGender";
import CountryList from "./pages/country/CountryList";
import CreateCountry from "./pages/country/CreateCountry";
import UpdateCountry from "./pages/country/UpdateCountry";
import CityList from "./pages/city/CityList";
import CreateCity from "./pages/city/CreateCity";
import UpdateCity from "./pages/city/UpdateCity";
import WarehouseList from "./pages/warehouse/WarehouseList";
import CreateWarehouse from "./pages/warehouse/CreateWarehouse";
import UpdateWarehouse from "./pages/warehouse/UpdateWarehouse";
// Load Module 
import {fetchArticles } from "./store/articleReducer";
import {fetchBrands } from "./store/brandReducer";
import {fetchCategories } from "./store/categoryReducer";
import {fetchCompanies } from "./store/companyReducer";
import {fetchGenders } from "./store/genderReducer";
import {fetchCountries } from "./store/countryReducer";
import {fetchCities } from "./store/cityReducer";
import {fetchWarehouses } from "./store/warehouseReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PosApp() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchArticles());
        dispatch(fetchBrands());
        dispatch(fetchCategories());
        dispatch(fetchCompanies());
        dispatch(fetchGenders());
        dispatch(fetchCountries());
        dispatch(fetchCities());
        dispatch(fetchWarehouses());
    },[]);
    return (
        <>
            <Router>
                <Topbar />
                <LeftSidebar />
                <div className="content-page">
                    <Switch>
                        <Route exact path="/" >
                            <Home />
                        </Route>
                        <Route path="/purchase/new" >
                            <Purchase />
                        </Route>
                        <Route path="/purchase/list" >
                            <PurchaseList />
                        </Route>
                        <Route path="/purchasereturn/new" >
                            <PurchaseReturn />
                        </Route>
                        <Route path="/purchasereturn/list" >
                            <PurchaseReturnList />
                        </Route>
                        <Route  path="/sales/new" >
                            <NewSale />
                        </Route>
                        <Route path="/sales/list" >
                            <SaleList />
                        </Route>
                        <Route path="/product/new" >
                            <CreateProduct />
                        </Route>
                        <Route path="/product/list" >
                            <ProductList />
                        </Route>
                        <Route exact path="/brands" >
                            <BrandList />
                        </Route>
                        <Route path="/brands/new" >
                            <CreateBrand />
                        </Route>
                        <Route path="/brands/:brandid" >
                            <UpdateBrand />
                        </Route>
                        <Route exact path="/categories" >
                            <CategoryList />
                        </Route>
                        <Route path="/categories/new" >
                            <CreateCategory />
                        </Route>
                        <Route path="/categories/:categoryid" >
                            <UpdateCategory />
                        </Route>
                        <Route exact path="/companies" >
                            <CompanyList />
                        </Route>
                        <Route path="/companies/new" >
                            <CreateCompany />
                        </Route>
                        <Route path="/companies/:companyid" >
                            <UpdateCompany />
                        </Route>
                        <Route exact path="/genders" >
                            <GenderList />
                        </Route>
                        <Route path="/genders/new" >
                            <CreateGender />
                        </Route>
                        <Route path="/genders/:genderid" >
                            <UpdateGender />
                        </Route>
                        <Route exact path="/countries" >
                            <CountryList />
                        </Route>
                        <Route path="/countries/new" >
                            <CreateCountry />
                        </Route>
                        <Route path="/countries/:countryid" >
                            <UpdateCountry />
                        </Route>
                        <Route exact path="/cities" >
                            <CityList />
                        </Route>
                        <Route path="/cities/new" >
                            <CreateCity />
                        </Route>
                        <Route path="/cities/:cityid" >
                            <UpdateCity />
                        </Route>
                        <Route exact path="/warehouses" >
                            <WarehouseList />
                        </Route>
                        <Route path="/warehouses/new" >
                            <CreateWarehouse />
                        </Route>
                        <Route path="/warehouses/:warehouseid" >
                            <UpdateWarehouse />
                        </Route>
                    </Switch>
                    <footer className="footer text-right">
                        2021 - 2022 © BEAUTY4ME.
                    </footer>
                </div>
                <RightSidebar />
            </Router>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
export default PosApp;