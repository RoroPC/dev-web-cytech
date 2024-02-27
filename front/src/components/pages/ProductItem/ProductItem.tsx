
import "./ProductItem.scss";
import ProductItemType from "./ProductItemType.ts"
import PropTypes from "prop-types";
import {useState} from "react";

function ProductItem({refer, title, img, price, stock}:ProductItemType) {
    const [seeStock, setSeeStock] = useState(false);
    return (
        <div className="product-item" id={refer}>
            <div className="product-item__image">
                <img src={img} alt="product"/>
            </div>
            <div className="product-item__info__title">{title}</div>
            <div className="product-item__info__price">{price} $</div>
            <div className="product-item__info__stock">{stock}</div>
            <button onClick={()=> setSeeStock(true) }>Stock</button>
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
    price: 50
}
export default ProductItem;