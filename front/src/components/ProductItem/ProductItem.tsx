
import "./ProductItem.css";

function ProductItem() {
    return (
        <div className="product-item">
        <div className="product-item__image">
            <img src="https://via.placeholder.com/150" alt="product" />
        </div>
        <div className="product-item__info">
            <div className="product-item__info__title">Product Title</div>
            <div className="product-item__info__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptas, voluptatum, quibusdam, quia quos quae voluptate
            exercitationem voluptatum quod asperiores quas. Quo, quae. Quisquam
            voluptas, voluptatum, quibusdam, quia quos quae voluptate
            exercitationem voluptatum quod asperiores quas. Quo, quae.
            </div>
            <div className="product-item__info__price">R$ 100,00</div>
        </div>
        </div>
    );
}
export default ProductItem;