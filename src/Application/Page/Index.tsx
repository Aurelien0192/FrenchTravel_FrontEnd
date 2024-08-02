import { Outlet } from "react-router-dom"
import { Header } from "../ComplexeComponents/Header/Header"
import { Footer } from "../ComplexeComponents/Footer/Footer"

export const Index:React.FC =() => {

    return(
        <div>
            <div className="w-full px-2 pt-10 md:pt-0 lg:px-14 flex flex-col gap-7">
                <Header />
                <Outlet />
            </div>
                <Footer />
        </div>
    )
}