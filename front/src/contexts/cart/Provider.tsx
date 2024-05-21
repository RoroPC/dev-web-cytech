import {CartContext, CartProviderProps} from "./index.ts";
import {useState} from "react";
import {ProductItemOrder} from "./ProductItemOrder.ts";


export const CartProvider: React.FC<CartProviderProps> = ({children})=>{
    const [cart, setCart] = useState<ProductItemOrder[]>();

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
    }

    const deleteFromCart = (product:ProductItemOrder)=> {
        if (cart == undefined)
            return;
        const newCart = cart.filter(item => item.item.id !== product.item.id);
        setCart(newCart)
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
}