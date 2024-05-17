
import "./ProductItem.scss";
import ProductItemType from "./ProductItemType.ts"
import PropTypes from "prop-types";
import {useState} from "react";
import {BASE_URL} from "../../../services/api/api.ts";

function ProductItem({id, name, img, price, stock}:ProductItemType) {
    const [seeStock, setSeeStock] = useState(false);
    const [qtOrder, setqtOrder] = useState(0);
    const [stockState, setStockState] = useState(stock)
    return (
        <div className="product-item" id={id}>
            <div className="product-item__image">
                <img src={img} alt="product"/>
            </div>
            <div className="product-item__info__title">{name}</div>
            <div className="product-item__info__price">{price} $</div>
            {seeStock && (
                <div className="product-item__info__stock--visible">{stockState}</div>
            )}
            <button onClick={() => setSeeStock(!seeStock)}>Stock</button>


            <button disabled={qtOrder == 0} onClick={() => {
                if (qtOrder > 0) {
                    setqtOrder(qtOrder - 1)
                }
            }}>-
            </button>
            <div className="product-item__info__qtOrder">{qtOrder} qt</div>

            <button disabled={qtOrder == stock} onClick={() => {
                if (qtOrder < stock) {
                    setqtOrder(qtOrder + 1)
                }
            }}>+
            </button>

            <button onClick={()=>{
                const newStock = stock- qtOrder;
                const stockData = {stock:newStock};
                fetch(BASE_URL+"/flowers/"+id+"/",
                    {
                        method:'PATCH',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(stockData),
                        credentials: "include"
                }).then(response => {
                    if(!response.ok) console.log("Error while updating stock ! "+response.status)
                    else setStockState(newStock);
                }).catch(error=>(console.log("Error while updating the stock : "+error)));

            }}>Ajouter Panier</button>
        </div>
    );
}

ProductItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

ProductItem.defaultProps = {
    name: "Product Title",
    img: "https://placehold.co/400",
    price: 50,
    stock: 20
}
export default ProductItem;