import { Loader } from "@mantine/core"
import { usePlaceToDisplay } from "../Module/Place/Place.hook"
import { PlaceDisplayLittleCard } from "./ComplexeComponents/Places/PlaceDisplayLittleCards"
import { SearchPlacesManagement } from "./ComplexeComponents/Places/SearchPlacesManager"
import { useEffect } from "react"

export function App() {

  const { placeToDisplay,updatePlaceToDisplay } = usePlaceToDisplay()

  useEffect(() => {
    updatePlaceToDisplay("/random")
  },[])
  
  return (
    <div className="p-11 flex flex-col gap-7 items-center">
        <SearchPlacesManagement />
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Activité à découvrir</h1>
          <div className="flex gap-5">
            {placeToDisplay['activity'] ? placeToDisplay['activity'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Hotel à découvrir</h1>
          <div className="flex gap-5">
            {placeToDisplay['hotel'] ? placeToDisplay['hotel'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Restaurant à découvrir</h1>
          <div className="flex gap-5">
            {placeToDisplay['restaurant'] ? placeToDisplay['restaurant'].map((e, index) => {
              return (<PlaceDisplayLittleCard key={index} place={e} />)
            }) : <Loader color="#D98D30" />}
          </div>
        </div>
    </div>
  )
}

export default App
