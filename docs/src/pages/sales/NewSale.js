const cart=[9,90,78,60,9,90,78,60,9,90,78,60,9,90,78,60];
const NewSale = () => {
    var sl = 1;
    return ( 
        <div className="content sales-screen">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="estimate-section">
                            <table className="table table-bordered table-sm" style={{ border: "1px solid #dee2e6" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ background: "#ffffff" }}>Article</td>
                                        <td style={{ background: "#ffffff" }}>Est.</td>
                                        <td style={{ background: "#ffffff", color: "red", textAlign: "right" }}>0</td>
                                        <td style={{ background: "#ffffff" }}>Act.</td>
                                        <td style={{ background: "#ffffff", textAlign: "right" }}>0</td>
                                        <td rowSpan="2" style={{ textAlign: "center" }}><span style={{ fontSize: "40px", fontWeight: '400', color: '#17a2b8', verticalAlign: 'middle' }}>Total:{50}</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{ background: "#ffffff" }}>Amounts</td>
                                        <td style={{ background: "#ffffff" }}>Est.</td>
                                        <td style={{ background: "#ffffff", color: "red", textAlign: "right" }}>0</td>
                                        <td style={{ background: "#ffffff" }}>Act.</td>
                                        <td style={{ background: "#ffffff", textAlign: "right" }}>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-section table-responsive">
                            <table className="cart__table table table-bordered table-striped table-sm">
                                <thead>
                                    <tr style={{ backgroundColor: '#17a2b8' }}>
                                        <th style={{ color: '#ffffff' }}>SN</th>
                                        <th style={{ color: '#ffffff' }}>Staf(Sales)</th>
                                        <th style={{ color: '#ffffff' }}>Article</th>
                                        <th style={{ color: '#ffffff' }}>Size</th>
                                        <th style={{ color: '#ffffff' }}>Qty</th>
                                        <th style={{ color: '#ffffff' }}>Price</th>
                                        <th style={{ color: '#ffffff' }}>Disc(%)</th>
                                        <th style={{ color: '#ffffff' }}>Disc</th>
                                        <th style={{ color: '#ffffff' }}>Amount</th>
                                        <th style={{ color: '#ffffff' }}></th>
                                    </tr>
                                </thead>
                                <tbody className="cart__tbody">
                                    {
                                        cart.map((article) =>
                                                <tr key={sl}>
                                                    <td>{sl++}</td>
                                                    <td>{"Rohim"}</td>
                                                    <td>{"article"}</td>
                                                    <td>{"80"}</td>
                                                    <td>{"4"}</td>
                                                    <td>{"500"}</td>
                                                    <td>{"5"}</td>
                                                    <td>{"25"}</td>
                                                    <td>{"475"}</td>
                                                    <td onClick={() => {}}><i style={{ color: 'red', cursor: 'pointer' }} className="fa fa-trash"></i></td>
                                                </tr>
                                                )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr style={{ backgroundColor: '#17a2b8' }}>
                                        <th colSpan="4" style={{ color: '#ffffff' }}>Total</th>
                                        <th style={{ color: '#ffffff' }}>{50}</th>
                                        <th colSpan="3" style={{ color: '#ffffff' }}></th>
                                        <th colSpan="2" style={{ color: '#ffffff' }}>{800}</th>
                                        {/* <th></th> */}
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-section">
                            <div className="form-group row">
                                <label htmlFor="barcode" className="col-sm-2 col-form-label">Barcode</label>
                                <div className="col-sm-10">
                                    <input name="barcode" tabIndex="1" onKeyDown={(e) => { }} onChange={(e) => {}} onBlur={(e) =>{} } type="text" className="form-control inputstyle" id="barcode" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 pr">
                                    <div className="form-group">
                                        <label htmlFor="salesStaf">{"staff"}</label>
                                        <input name="salesStaf"  tabIndex="2" onKeyDown={(e) => {  }} onChange={(e) => {}} onBlur={()=> {}} onFocus={()=>{}} type="text" className="form-control inputstyle" id="salesStaf" />
                                    </div>
                                </div>
                                <div className="col-md-3 plr">
                                    <div className="form-group">
                                        <label htmlFor="article">{"article"}</label>
                                        <input name="article" tabIndex="3" onKeyDown={(e) => {  }} onChange={(e) => {}} onBlur={() => {}} onFocus={() => {}} type="text" className="form-control inputstyle" id="article" />
                                    </div>
                                </div>
                                <div className="col-md-3 plr">
                                    <div className="form-group">
                                        <label htmlFor="size">Size</label>
                                        <input name="size"  tabIndex="4" onKeyDown={(e) => {  }} onChange={(e) => {}} type="text" className="form-control inputstyle" id="size" />
                                    </div>
                                </div>
                                <div className="col-md-3 pl">
                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input name="quantity" tabIndex="5" onKeyDown={(e) => {  }} onChange={(e) => {}} type="text" className="form-control inputstyle" id="quantity" />
                                    </div>
                                </div>
                            </div>
                            <div className="stock-section">
                                <table className="table table-bordered table-striped table-sm">
                                    <tbody>
                                        <tr className="sizes" style={{ backgroundColor: '#17a2b8' }}>
                                            <td style={{ color: '#ffffff' }}>Sizes</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{90}</td>
                                            <td style={{ color: '#ffffff' }}>{30}</td>
                                            <td style={{ color: '#ffffff' }}>{40}</td>
                                            <td style={{ color: '#ffffff' }}>{20}</td>
                                            <td style={{ color: '#ffffff' }}>{70}</td>
                                            <td style={{ color: '#ffffff' }}>{20}</td>
                                            <td style={{ color: '#ffffff' }}>{10}</td>
                                            <td style={{ color: '#ffffff' }}>{40}</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{30}</td>
                                            <td style={{ color: '#ffffff' }}>{70}</td>
                                            <td style={{ color: '#ffffff' }}>{50}</td>
                                            <td style={{ color: '#ffffff' }}>{90}</td>
                                            <td style={{ color: '#ffffff' }}>Total</td>
                                        </tr>
                                        <tr className="stock">
                                            <td>Stock</td>
                                            <td>{1}</td>
                                            <td>{3}</td>
                                            <td>{4}</td>
                                            <td>{5}</td>
                                            <td>{6}</td>
                                            <td>{2}</td>
                                            <td>{7}</td>
                                            <td>{8}</td>
                                            <td>{9}</td>
                                            <td>{10}</td>
                                            <td>{11}</td>
                                            <td>{12}</td>
                                            <td>{13}</td>
                                            <td>{14}</td>
                                            <td>{15}</td>
                                            <td>{50}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="color-section">
                                <table className="table table-bordered table-striped table-sm">
                                    <tbody>
                                        <tr className="colors" style={{ backgroundColor: '#17a2b8' }}>
                                            <td style={{ color: '#ffffff' }}>Color</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{90}</td>
                                            <td style={{ color: '#ffffff' }}>{30}</td>
                                            <td style={{ color: '#ffffff' }}>{40}</td>
                                            <td style={{ color: '#ffffff' }}>{20}</td>
                                            <td style={{ color: '#ffffff' }}>{70}</td>
                                            <td style={{ color: '#ffffff' }}>{20}</td>
                                            <td style={{ color: '#ffffff' }}>{10}</td>
                                            <td style={{ color: '#ffffff' }}>{40}</td>
                                            <td style={{ color: '#ffffff' }}>{80}</td>
                                            <td style={{ color: '#ffffff' }}>{30}</td>
                                            <td style={{ color: '#ffffff' }}>{70}</td>
                                            <td style={{ color: '#ffffff' }}>{50}</td>
                                            <td style={{ color: '#ffffff' }}>{90}</td>
                                            <td style={{ color: '#ffffff' }}>Total</td>
                                        </tr>
                                        <tr className="stock">
                                            <td>Stock</td>
                                            <td>{1}</td>
                                            <td>{3}</td>
                                            <td>{4}</td>
                                            <td>{5}</td>
                                            <td>{6}</td>
                                            <td>{2}</td>
                                            <td>{7}</td>
                                            <td>{8}</td>
                                            <td>{9}</td>
                                            <td>{10}</td>
                                            <td>{11}</td>
                                            <td>{12}</td>
                                            <td>{13}</td>
                                            <td>{14}</td>
                                            <td>{15}</td>
                                            <td>{50}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="item-details">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div>
                                            <img
                                                src={"http://turretpos.najjyo.com/image/login-logo.png"}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <table className="table table-bordered table-sm" style={{ border: "1px solid #dee2e6" }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ background: "#ffffff" }}>{"article.Article_Code"}</td>
                                                    <td style={{ background: "#ffffff" }}>{"article.Article_Name"}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff" }}>Retail Price:</td>
                                                    <td style={{ background: "#ffffff" }}>{"article.Price_1"}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff" }}>Current Price:</td>
                                                    <td style={{ background: "#ffffff" }}>{"article.Current_Price"}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff" }}>Promotion:</td>
                                                    <td style={{ background: "#ffffff" }}>{"article.Promotion_Code"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="cash-counter">
                                <div className="row">
                                    <div className="col-md-6">
                                        <table className="table table-bordered table-sm" style={{ border: "1px solid #dee2e6" }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ backgroundColor: '#17a2b8', textAlign: "right", color: "#ffffff" }}>Total</td>
                                                    <td style={{ backgroundColor: '#17a2b8', textAlign: "right", color: "#ffffff" }}>{5000}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}>Discount</td>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}>0</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ backgroundColor: '#17a2b8', textAlign: "right", color: "#ffffff" }}>Net Total</td>
                                                    <td style={{ backgroundColor: '#17a2b8', textAlign: "right", color: "#ffffff" }}>{8000}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}>Voucher</td>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}>Loyalty</td>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ background: "#ffffff", textAlign: "right" }}>Cash</td>
                                                    <td style={{ background: "#ffffff", textAlign: "right", padding: "0px" }}> <input style={{ height: "32px" }} type="text" className="form-control inputstyle" id="cash" /></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ backgroundColor: '#17a2b8', color: "#ffffff", textAlign: "right" }}>Refund</td>
                                                    <td style={{ backgroundColor: '#17a2b8', color: "#ffffff", textAlign: "right" }}></td>
                                                </tr>
                                            </tbody>
                                        </table>
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
 
export default NewSale;