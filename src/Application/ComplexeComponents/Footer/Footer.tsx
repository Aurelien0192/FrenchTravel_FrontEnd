import { NavLink } from "react-router-dom"
import { FrenchTravel } from "../../Components/svg/FrenchTravel"

export const Footer:React.FC = () => {
    return(
        <div className="bg-brown px-14 py-7 mt-4 flex flex-col md:flex-row items-center gap-5 md:justify-between">
            <div>
                <div className="flex items-center">
                    <FrenchTravel />
                    <h1 className="text-4xl text-sand font-bold">French TRAVEL</h1>
                </div>
                <p className="text-2xl text-sand">© 2024 AMCompany Tous droits réservés</p>
            </div>
            <NavLink className="text-sand" to="/policy">charte de confidentialité</NavLink>
        </div>
    )
}