import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../../contexts/cart";
import {BASE_URL} from "../../../services/api/api.ts";
import {ProductItemOrder} from "../../../contexts/cart/ProductItemOrder.ts";
import './CartPage.scss'
import {useUser} from "../../../contexts/user";

function CartPage(){
    const cartContext = useContext(CartContext);
    if (!cartContext){
        throw new Error("Cart context must be within a CartProvider")
    }

    const [cart, setCart] = useState(cartContext.cart)
    const {deleteFromCart} = cartContext

    const {userData } = useUser();

    const [isConnectedState,setIsConnectedState] = useState((userData !== undefined && userData !== null));
    useEffect(() => {
        setIsConnectedState((userData !== undefined && userData !== null))
    }, [userData]);


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
                <div className="cart__btn__container">

                    <h3>Prix totale : {calculatePrice(cart)} €</h3>
                    <p className={isConnectedState ? "cart__connected" : "cart__not__connected"}>Vous n'êtes pas
                        connecté !</p>

                    <button onClick={() => {
                        const flowerList: string[] = []
                        cart?.map((itemToOrder) => {
                            changeStock(itemToOrder.item.stock, itemToOrder.quantity, itemToOrder.item.id)
                            flowerList.push(itemToOrder.item.id)
                        })
                        updateUserBasket(flowerList)
                    }} disabled={cart?.length === 0 || cart == undefined || !isConnectedState}
                            className="cart__order__btn">Commander
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

function updateUserBasket(flowerList:string[]){
    const requestObject = {flowers:flowerList}
    fetch(BASE_URL+"/basket/",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
        credentials:"include"
    }).then(response =>{ if(!response.ok)console.log("User not connected")});

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