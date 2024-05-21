import {CartContext, CartProviderProps} from "./index.ts";
import {useEffect, useState} from "react";
import {ProductItemOrder} from "./ProductItemOrder.ts";
import Cookies from "js-cookie";


export const CartProvider: React.FC<CartProviderProps> = ({children})=>{
    const [cart, setCart] = useState<ProductItemOrder[]>();

    useEffect(() => {
        resetCart();
    }, []);

    const addToCart = (product:ProductItemOrder) => {
        const newCart = [];
        cart?.forEach(productI=>{
            if (productI.item.id === product.item.id){
                productI.quantity += product.quantity
            }else {
                newCart.push(productI)
            }
        });
        newCart.push(product);
        setCart(newCart);
        Cookies.set("cart",JSON.stringify(newCart));
    }
    const resetCart = () => {
        const storedCart = Cookies.get("cart");
        if (storedCart){
            setCart(JSON.parse(storedCart));
        }
    }
    const deleteFromCart = (product:ProductItemOrder)=> {
        if (cart == undefined)
            return;
        const newCart = cart.filter(item => item.item.id !== product.item.id);
        setCart(newCart)
        Cookies.set("cart", JSON.stringify(newCart));
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, deleteFromCart, resetCart }}>
            {children}
        </CartContext.Provider>
    );
}