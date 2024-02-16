
import "./ProductItem.scss";
import ProductItemType from  "./ProductItemType.ts"
import PropTypes from "prop-types";
function ProductItem({refer, title, desc, img, price}:ProductItemType) {
    return (
        <div className="product-item" id={refer}>
        <div className="product-item__image">
            <img src={ img } alt="product" />
        </div>
        <div className="product-item__info">
            <div className="product-item__info__title">{title}</div>
            <div className="product-item__info__description">
                {desc}
            </div>
            <div className="product-item__info__price">{price} $</div>
        </div>
        </div>
    );
}

ProductItem.propTypes = {
    refer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

ProductItem.defaultProps = {
    title: "Product Title",
    img: "https://placehold.co/400",
    price: 50
}
export default ProductItem;