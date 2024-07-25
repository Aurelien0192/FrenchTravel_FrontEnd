import { Outlet } from "react-router-dom"
import { HeaderWithSearch } from "../ComplexeComponents/Header/HeaderWithSearch"

export const IndexWithSearch:React.FC =() => {

    return(
        <div className="px-14 flex flex-col gap-7">
            <HeaderWithSearch />
            <Outlet />
        </div>
    )
}