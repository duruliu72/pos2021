import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {toast } from 'react-toastify';
import axios from 'axios';
const CreateProduct = () => {
    const [article,setArticle]=useState({
        company_id:"",
        articleCode:"",
        articleName:"",
        brand_id:"",
        category_id:"",
        gender_id:"",
        articleType_id:""
    });
    const bean={size:"",color:"",mrp:"",price:"",imageUrl:"",stockKeepingUnit:"",barcode:"",barcodeView:""}
    const [childs,setChilds]=useState([{id:1,...bean}]);
    const nextId = (items) => {
        const maxId = items.reduce((maxId, item) => Math.max(item.id, maxId), 0);
        return maxId + 1;
    }
    const addRowFields=event=>{
        setChilds([...childs,{id:nextId(childs),...bean}]);
    }
    const removeRowFields=child=>{
        if (childs.length!=1) {
            const result = childs.filter(item => item.id!=child.id);
            let id=0;
            const newResult=result.map(item=>{
                id++;
                return {...item,id}
            });
            setChilds([...newResult]);
        }
    }
    const handleArticleChange=event=>{
        article[event.currentTarget.name]=event.currentTarget.value;
        setArticle({...article});
    }
    const handleChildChange=(event,child)=>{
        const findOne=childs.find((item)=>{
            return item.id==child.id;
        });
        findOne[event.currentTarget.name]=event.currentTarget.value;
        let childsCopy=childs.map(item=>{
            if(item.id==child.id){
                return findOne;
            }
            return item;
        })
        setChilds([...childsCopy]);
    }
    const [selectedFiles,setSelectedFiles]=useState({length:0})
    const fetchIndex=(selectedFiles) => {
        let objArray=Object.keys(selectedFiles);
        return objArray.length-1;
    }
    const handleChildFileChange=(event,child)=>{
        const findOne=childs.find((item)=>{
            return item.id==child.id;
        });
        findOne[event.currentTarget.name]=event.target.files[0];
        let childsCopy=childs.map(item=>{
            if(item.id==child.id){
                return findOne;
            }
            return item;
        })
        setChilds([...childsCopy]);
        setSelectedFiles({...selectedFiles,[fetchIndex(selectedFiles)]:event.target.files[0],length:(fetchIndex(selectedFiles)+1)});
    }
    const submitArticle=event=>{
        event.preventDefault();
        console.log(article);
        console.log(childs);
        let  sizes=[];
        let  colors=[];
        let  mrps=[];
        let  prices=[];
        let  imageUrls=[];
        let  stockKeepingUnits=[];
        let  barcodes=[];
        let  barcodeViews=[];
        childs.forEach((item, index)=>{
            sizes.push(item.size);
            colors.push(item.color);
            mrps.push(item.mrp);
            prices.push(item.price);
            imageUrls.push(item.imageUrl);
            stockKeepingUnits.push(item.stockKeepingUnit);
            barcodes.push(item.barcode);
            barcodeViews.push(item.barcodeView);
        });
        console.log(selectedFiles)
        console.log(imageUrls)
        const data = new FormData()
        data.append('company_id',article.company_id);
        data.append('articleCode',article.articleCode);
        data.append('articleName',article.articleName);
        data.append('brand_id',article.brand_id);
        data.append('category_id',article.category_id);
        data.append('gender_id',article.gender_id);
        data.append('articleType_id',article.articleType_id);
        data.append('sizes',sizes);
        data.append('colors',colors);
        data.append('mrps',mrps);
        data.append('prices',prices);
        for(var x = 0; x<imageUrls.length; x++) {
            data.append('imageUrls',imageUrls[x])
        }
        data.append('stockKeepingUnits',stockKeepingUnits);
        data.append('barcodes',barcodes);
        data.append('barcodeViews',barcodeViews);
        axios.post("http://localhost:8080/api/articles", data)
       .then(res => {
            console.log(res.statusText)
        }).catch(err => {
            console.log(err.message)
        })
    }
    let i=0;
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="pull-left page-title">Create Product</h4>
                        <ol className="breadcrumb pull-right">
                            <li><Link to="/">Beauty4Me</Link></li>
                            <li><Link to="/product/list">Article LIST</Link></li>
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
                                            <input type="text" name="company_id" onChange={handleArticleChange} value={article.company_id} className="form-control" id="company_id" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleCode">Product Code</label>
                                            <input type="text" name="articleCode" onChange={handleArticleChange} value={article.articleCode} className="form-control" id="articleCode" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleName">Product Name</label>
                                            <input type="text" name="articleName" onChange={handleArticleChange} value={article.articleName} className="form-control" id="articleName" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="brand">Brand</label>
                                            <input type="text" name="brand_id" onChange={handleArticleChange} value={article.brand_id} className="form-control" id="brand" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="category">Category</label>
                                            <input type="text" name="category_id" onChange={handleArticleChange} value={article.category_id} className="form-control" id="category" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="gender">Gender</label>
                                            <input type="text" name="gender_id" onChange={handleArticleChange} value={article.gender_id} className="form-control" id="gender" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="articleType_id">Product Type</label>
                                            <input type="text" name="articleType_id" onChange={handleArticleChange} value={article.articleType_id} className="form-control" id="articleType_id" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputPassword1">Note</label>
                                            <textarea className="form-control" rows="2" id="example-textarea-input"></textarea>
                                        </div>
                                    </div>                                   
                                    <div className="form-row">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered dt-responsive nowrap" style={{borderCollapse:"collapse",borderSpacing:"0",width:"100%"}}>
                                                <thead>
                                                    <tr>
                                                        <th>#ID</th>
                                                        <th>Size</th>
                                                        <th>Color</th>
                                                        <th>Mrp</th>
                                                        <th>Price</th>
                                                        <th>Unit</th>
                                                        <th>Barcode</th>
                                                        <th>Barcode View</th>
                                                        <th>Picture</th>
                                                        <th><i onClick={addRowFields} style={{cursor: 'pointer' }} className="fa fa-plus"></i></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        childs.map((child) =>{
                                                            return <tr key={child.id} className="childs-row">
                                                            <td style={{textAlign: 'center',verticalAlign: 'middle'}}>{++i}</td>
                                                            <td><input type="text" name="size"  value={child.size} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="color" value={child.color} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="mrp" value={child.mrp} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="price" value={child.price} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="stockKeepingUnit" value={child.stockKeepingUnit} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="barcode" value={child.barcode} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="text" name="barcodeView" value={child.barcodeView} onChange={(e) => {handleChildChange(e,child)}} className="form-control childInput" /></td>
                                                            <td><input type="file" name="imageUrl" onChange={(e) => {handleChildFileChange(e,child)}} className="form-control childInput" /></td>
                                                            <td style={{textAlign: 'center',verticalAlign: 'middle'}}><i onClick={() => {removeRowFields(child)}} className="fa fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i></td>
                                                        </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
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
export default CreateProduct;