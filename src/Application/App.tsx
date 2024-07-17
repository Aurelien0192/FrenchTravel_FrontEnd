import { Link } from "react-router-dom"
import { HotelCategorieSelector } from "./ComplexeComponents/HotelCategorieSelector"

export function App() {

  
  return (
    <div className="p-11">
        <Link className="py-4 px-4 bg-brown text-sand my-8 rounded-lg border" to={'AddPlace'}>Ajouter un lieu</Link>
        <HotelCategorieSelector/>
    </div>
  )
}

export default App
