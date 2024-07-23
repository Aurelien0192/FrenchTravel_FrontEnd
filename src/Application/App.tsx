import { usePlaceToDisplayInFirstPage } from "../Module/Place/Place.hook"
import { PlaceDisplayLittleCard } from "./ComplexeComponents/PlaceDisplayLittleCards"
import { SearchPlacesManagement } from "./ComplexeComponents/SearchPlacesManager"

export function App() {

  const { placesFirstPage } = usePlaceToDisplayInFirstPage()
  
  return (
    <div className="p-11 flex flex-col gap-7 items-center">
        <SearchPlacesManagement />
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
