import { Outlet } from "react-router-dom"
import { HeaderWithSearch } from "../ComplexeComponents/Header/HeaderWithSearch"
import { Footer } from "../ComplexeComponents/Footer/Footer"

export const IndexWithSearch:React.FC =() => {

    return(
        <div>
            <div className="w-full px-2 pt-10 md:pt-0 md:px-14 flex flex-col gap-7">
                <HeaderWithSearch />
                <Outlet />
            </div>
                <Footer />
        </div>
    )
}