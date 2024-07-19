import { Outlet } from "react-router-dom"
import logoTravel from "../../../public/Logo/logoTravel 1.svg"
import { Button } from "../Components/Button"

export const Index:React.FC =() => {

    return(
        <div className="px-14">
            <div className="flex justify-between items-center">
                <img src={logoTravel} />
                <div className="flex gap-3 mr-8">
                    <Button size={"md"} variant="light">S'inscrire</Button>
                    <Button size={"md"} variant="light">Se connecter</Button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}