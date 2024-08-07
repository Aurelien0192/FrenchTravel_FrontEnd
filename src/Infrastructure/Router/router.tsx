import { createBrowserRouter } from "react-router-dom";
import App from "../../Application/App";
import { AddPlace } from "../../Application/Page/AddPlace";
import { Index } from "../../Application/Page/Index";
import { IndexWithSearch } from "../../Application/Page/IndexWithSearch";
import { PlacePage } from "../../Application/Page/Place";
import { SearchPage } from "../../Application/Page/SearchPage";
import { UserPage } from "../../Application/Page/User";
import { OwnerPlacesBrowser } from "../../Application/Page/OwnerPlacesBrowser";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Index />,
        children:[{
            element: <App />,
            index:true
        }]
    },{
        path:"/index",
        element:<IndexWithSearch />,
        children: [{
            path:"/index/AddPlace",
            element : <AddPlace />,
            index: true
        },{
            path:"/index/Place/:id",
            element : <PlacePage />
        },{
            path:"/index/search/",
            element: <SearchPage />,
        },{
            path:"/index/user/",
            element: <UserPage />,
            children:[{
                path:"/index/user/places",
                element:<OwnerPlacesBrowser />,
                index: true
            }]
        }]
    },
])