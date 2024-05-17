
import "./ProductItem.scss";
import ProductItemType from "./ProductItemType.ts"
import PropTypes from "prop-types";
import {useState} from "react";

function ProductItem({refer, title, img, price, stock}:ProductItemType) {
    const [seeStock, setSeeStock] = useState(false);
    const [qtOrder, setqtOrder] = useState(0);
    return (
        <div className="product-item" id={refer}>
            <div className="product-item__image">
                <img src={img} alt="product"/>
            </div>
            <div className="product-item__info__title">{title}</div>
            <div className="product-item__info__price">{price} $</div>
            {seeStock && (
                <div className="product-item__info__stock--visible">{stock}</div>
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

            <button>Ajouter Panier</button>
        </div>
    );
}

ProductItem.propTypes = {
    refer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

ProductItem.defaultProps = {
    title: "Product Title",
    img: "https://placehold.co/400",
    price: 50,
    stock: 20
}
export default ProductItem;