import { Link } from "react-router-dom"
import { usePlaceToDisplayInFirstPage } from "../Module/Place/Place.hook"
import { PlaceDisplayLittleCard } from "./ComplexeComponents/PlaceDisplayLittleCards"

export function App() {

  const { placesFirstPage } = usePlaceToDisplayInFirstPage()
  
  return (
    <div className="p-11 flex flex-col gap-4">
        <Link className="py-4 px-4 bg-brown text-sand my-8 rounded-lg border" to={'AddPlace'}>Ajouter un lieu</Link>
        <div className="flex flex-col gap-3">
          <h1 className=" font-bold text-2xl gap-3" >Activité à découvrir</h1>
          <div className="flex gap-5">
            {placesFirstPage && placesFirstPage.map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            })}
          </div>
        </div>
    </div>
  )
}

export default App
