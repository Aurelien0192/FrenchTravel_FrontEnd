import { Loader } from "@mantine/core"
import { usePlaceToDisplayInFirstPage } from "../Module/Place/Place.hook"
import { PlaceDisplayLittleCard } from "./ComplexeComponents/PlaceDisplayLittleCards"
import { SearchPlacesManagement } from "./ComplexeComponents/SearchPlacesManager"

export function App() {

  const { placesFirstPage } = usePlaceToDisplayInFirstPage("random")
  
  return (
    <div className="p-11 flex flex-col gap-7 items-center">
        <SearchPlacesManagement />
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Activité à découvrir</h1>
          <div className="flex gap-5">
            {placesFirstPage['activity'].length>0 ? placesFirstPage['activity'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Hotel à découvrir</h1>
          <div className="flex gap-5">
            {placesFirstPage['hotel'].length>0 ? placesFirstPage['hotel'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Restaurant à découvrir</h1>
          <div className="flex gap-5">
            {placesFirstPage['restaurant'].length>0 ? placesFirstPage['restaurant'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
    </div>
  )
}

export default App
