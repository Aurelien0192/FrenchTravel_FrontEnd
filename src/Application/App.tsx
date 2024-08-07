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
    <div className="w-full md:p-11 flex flex-col gap-7 items-center">
        <SearchPlacesManagement />
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Activité à découvrir</h1>
          <div className="w-full overflow-auto md:overflow-hidden">
            <div className="flex gap-5 pb-3 w-fit">
              {placeToDisplay['activity'] ? placeToDisplay['activity'].map((e, index) => {
                return (<PlaceDisplayLittleCard key={index} place={e} />)
              }) : <Loader color="#D98D30" />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Hotel à découvrir</h1>
          <div className="w-full overflow-x-scroll md:overflow-hidden">
            <div className="flex gap-5 pb-3 w-fit">
              {placeToDisplay['hotel'] ? placeToDisplay['hotel'].map((e, index) => {
                return (<PlaceDisplayLittleCard key={index} place={e} />)
              }) : <Loader color="#D98D30" />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className=" font-bold text-2xl text-start gap-3" >Restaurant à découvrir</h1>
          <div className="w-full overflow-x-scroll md:overflow-hidden">
            <div className="flex gap-5 pb-3 w-fit">
              {placeToDisplay['restaurant'] ? placeToDisplay['restaurant'].map((e, index) => {
                return (<PlaceDisplayLittleCard key={index} place={e} />)
              }) : <Loader color="#D98D30" />}
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
