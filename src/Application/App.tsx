import { Link } from "react-router-dom"
import { usePlaceToDisplay } from "../Module/Place/Place.hook"
import { PlaceDisplayLittleCard } from "./ComplexeComponents/PlaceDisplayLittleCards"

export function App() {

  const { placeTab } = usePlaceToDisplay()
  console .log(placeTab)

  return (
    <div className="p-11 flex flex-col gap-4">
        <Link className="py-4 px-4 bg-brown text-sand my-8 rounded-lg border" to={'AddPlace'}>Ajouter un lieu</Link>
        <div>
          <PlaceDisplayLittleCard place={placeTab[0]} />
        </div>
    </div>
  )
}

export default App
