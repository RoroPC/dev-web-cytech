import "./Rosiers.scss"
import ProductItem from "../ProductItem/ProductItem.tsx";

function Rosiers(){
    return(
        <main>
            <h1>Les Rosiers</h1>
            <ProductItem refer="b01" />
            <ProductItem refer={"b02"} />
            <ProductItem refer={"b03"} />
            <ProductItem refer={"b04"} />
        </main>
    )
}

export default Rosiers;