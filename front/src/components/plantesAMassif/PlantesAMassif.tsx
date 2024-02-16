import "./PlantesAMassif.scss"
import ProductItem from "../ProductItem/ProductItem.tsx";

function PlantesAMassif(){
    return(
        <main>
            <h1>Les plantes à Massif</h1>
            <ProductItem refer="b01" />
            <ProductItem refer={"b02"} />
            <ProductItem refer={"b03"} />
            <ProductItem refer={"b04"} />
        </main>
    )
}

export default PlantesAMassif;