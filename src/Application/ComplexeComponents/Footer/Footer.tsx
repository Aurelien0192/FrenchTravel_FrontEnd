import { FrenchTravel } from "../../Components/svg/FrenchTravel"

export const Footer:React.FC = () => {
    return(
        <div className="bg-brown px-14 py-7">
            <div className="flex items-center">
                <FrenchTravel />
                <h1 className="text-4xl text-sand font-bold">French TRAVEL</h1>
            </div>
            <p className="text-2xl text-sand">© 2024 AMCompany Tous droits réservés</p>
        </div>
    )
}