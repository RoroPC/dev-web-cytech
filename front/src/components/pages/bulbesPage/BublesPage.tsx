import "./BulbesPage.scss"
import ProductItem from "../ProductItem/ProductItem.tsx";

function BublesPage(){
    return(
        <main>
            <h1>Les bulbes</h1>
            <ProductItem refer="b01" />
            <ProductItem refer={"b02"} />
            <ProductItem refer={"b03"} />
            <ProductItem refer={"b04"} />
        </main>
    )
}

export default BublesPage;