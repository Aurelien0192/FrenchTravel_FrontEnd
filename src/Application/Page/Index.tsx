import { Outlet } from "react-router-dom"
import { Header } from "../ComplexeComponents/Header/Header"

export const Index:React.FC =() => {

    return(
        <div className="px-14 flex flex-col gap-7">
            <Header />
            <Outlet />
        </div>
    )
}