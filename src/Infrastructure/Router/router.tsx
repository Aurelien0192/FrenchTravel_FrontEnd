import { createBrowserRouter } from "react-router-dom";
import App from "../../Application/App";
import { AddPlace } from "../../Application/Page/AddPlace";
import { Index } from "../../Application/Page/Index";
import { IndexWithSearch } from "../../Application/Page/IndexWithSearch";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Index />,
        children:[{
            element: <App />,
            index:true
        }]
    },{
        path:"/AddPlace",
        element:<IndexWithSearch />,
        children: [{
            element : <AddPlace />,
            index: true
        }]
    }
])