import "./BulbesPage.scss"
import ProductItem from "../ProductItem/ProductItem.tsx";

function BublesPage(){
    return(
        <main>
            <ProductItem refer="b01" />
            <ProductItem refer={"b02"} />
            <ProductItem refer={"b03"} />
            <ProductItem refer={"b04"} />
        </main>
    )
}

export default BublesPage;