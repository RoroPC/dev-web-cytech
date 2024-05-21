
import "./ProductItem.scss";
import ProductItemType from "./ProductItemType.ts"
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {CartContext} from "../../../contexts/cart";
import {ProductItemOrder} from "../../../contexts/cart/ProductItemOrder.ts";

function ProductItem({id, name, img, price, stock}:ProductItemType) {
    const [seeStock, setSeeStock] = useState(false);
    const [qtOrder, setqtOrder] = useState(0);
    const [stockState,] = useState(stock)

    const cartContext = useContext(CartContext);
    let addToCart = (product:ProductItemOrder)=>{
        product;
    };
    if (cartContext != undefined){
        addToCart = cartContext.addToCart;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');

    const openPopup = (imgSrc: string) => {
        setCurrentImg(imgSrc);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className="product-item" id={id}>
            <div className="product-item__image">
                <img src={img} alt="product" onClick={() => openPopup(img)} />
            </div>
            {isOpen && (
                <div className="popup" onClick={closePopup}>
                    <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                        <img src={currentImg} alt="product enlarged" />
                        <button className="popup__close" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
            <div className="product-item__info__title">{name}</div>
            <div className="product-item__info__price">{price} $</div>


            <button className="product-item__info__plus" disabled={qtOrder == 0} onClick={() => {
                if (qtOrder > 0) {
                    setqtOrder(qtOrder - 1)
                }
            }}>-
            </button>
            <div className="product-item__info__qtOrder">{qtOrder}</div>

            <button disabled={qtOrder == stock} onClick={() => {
                if (qtOrder < stock) {
                    setqtOrder(qtOrder + 1)
                }
            }} className="product-item__info__plus">+
            </button>

            <button onClick={() => {
                const item = {id, name, img, price, stock}
                const itemOrder: ProductItemOrder = {item, quantity:qtOrder}
                addToCart(itemOrder)
            }} disabled={qtOrder == 0} className="product-item__info__btn product-item__info__order">Ajouter au panier
            </button>
            <button onClick={() => setSeeStock(!seeStock)} className="product-item__info__btn">Stock</button>
            {seeStock && (
                <div className="product-item__info__stock--visible">{stockState}</div>
            )}
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