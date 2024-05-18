import {useContext, useState} from "react";
import {CartContext} from "../../../contexts/cart";
import {BASE_URL} from "../../../services/api/api.ts";
import {ProductItemOrder} from "../../../contexts/cart/ProductItemOrder.ts";
import './CartPage.scss'

function CartPage(){
    const cartContext = useContext(CartContext);
    if (!cartContext){
        throw new Error("Cart context must be within a CartProvider")
    }

    const [cart, setCart] = useState(cartContext.cart)
    const {deleteFromCart} = cartContext
    console.log(cart?.length)
    return(
        <main className="cart">
            <h1>Panier</h1>
            <div className="cart__item__btn__container">
                {cart?.length === 0 || cart == undefined ? (
                    <p>Votre panier est vide</p>
                ) : (
                    <div className="cart__item__container">
                        {cart.map((itemToOrder: ProductItemOrder, index:number) => (
                            <div key={index} className="cart__item">
                                <img src={itemToOrder.item.img}/>
                                <p className="cart__item__title">{itemToOrder.item.name}</p>
                                <p>{itemToOrder.item.price}</p>
                                <p>Quantité : {itemToOrder.quantity}</p>
                                <button onClick={()=>{
                                    deleteFromCart(itemToOrder);
                                    setCart(cart.filter(item => item.item.id !== itemToOrder.item.id))
                                }}>Supprimer</button>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <h3>Prix totale : {calculatePrice(cart)} €</h3>
                    <button onClick={() => {
                        cart?.map((itemToOrder) => {
                            changeStock(itemToOrder.item.stock, itemToOrder.quantity, itemToOrder.item.id)
                        })
                    }} disabled={cart?.length === 0 || cart == undefined} className="cart__order__btn">Commander
                    </button>
                </div>
            </div>
        </main>
    )
}

function changeStock(stock: number, qtOrder: number, id: string) {
    const newStock = stock - qtOrder;
    const stockData = {stock: newStock};
    if (newStock >= 0) {
        fetch(BASE_URL + "/flowers/" + id + "/",
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockData),
                credentials: "include"
            }).then(response => {
            if (!response.ok) console.log("Error while updating stock ! " + response.status)
        }).catch(error => (console.log("Error while updating the stock : " + error)));
    }

}

function calculatePrice(list:ProductItemOrder[]|undefined):number{
    if (list == undefined){
        return 0;
    }
    let price = 0;
    list.forEach((e)=>{
        price += e.quantity * e.item.price;
    })
    return price;
}

export default CartPage;