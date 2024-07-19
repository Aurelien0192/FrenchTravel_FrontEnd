import { Outlet } from "react-router-dom"
import { Header } from "../ComplexeComponents/Header"

export const Index:React.FC =() => {

    return(
        <div className="px-14">
            <Header />
            <Outlet />
        </div>
    )
}