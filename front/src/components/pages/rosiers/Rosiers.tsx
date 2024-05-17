import "./Rosiers.scss"
import ProductItem from "../ProductItem/ProductItem.tsx";
import {useEffect, useState} from "react";
import ProductItemType from "../ProductItem/ProductItemType.ts";
import {BASE_URL} from "../../../services/api/api.ts";

function Rosiers(){
    const [flowers, setFlowers] = useState<ProductItemType[]>([]);
    useEffect(() => {
        fetch(BASE_URL+"/flowers/category/4/")
            .then(response => response.json())
            .then((data:ProductItemType[]) => setFlowers(data))
            .catch(error => console.log('erreur lors du chargement des fleurs :'+error))
    }, []);
    return(
        <main>
            <h1>Les Rosiers</h1>
            {flowers.map(item  => (
                <ProductItem key={item.id} id={item.id} name={item.name} img={item.img} price={item.price} stock={item.stock}/>
            ))}
        </main>
    )
}

export default Rosiers;