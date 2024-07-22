import { Link } from "react-router-dom"
import { useAuthentification } from "../Module/Authentification/authentification.hook"

export function App() {

  const { authentifiateUser } = useAuthentification()

  console.log(authentifiateUser)
  
  return (
    <div className="p-11">
        <Link className="py-4 px-4 bg-brown text-sand my-8 rounded-lg border" to={'AddPlace'}>Ajouter un lieu</Link>
    </div>
  )
}

export default App
