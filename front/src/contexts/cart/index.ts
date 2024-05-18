import {createContext, ReactNode} from "react";
import {ProductItemOrder} from "./ProductItemOrder.ts";

export interface CartContextType {
    cart: ProductItemOrder[]|undefined;
    addToCart: (product: ProductItemOrder) => void;
    deleteFromCart: (product: ProductItemOrder) => void;
}

export const CartContext = createContext<CartContextType|undefined>(undefined)

export interface CartProviderProps{
    children:ReactNode;
}