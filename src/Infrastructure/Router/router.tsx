import { createBrowserRouter } from "react-router-dom";
import App from "../../Application/App";
import { AddPlace } from "../../Application/Page/AddPlace";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
    },{
        path:"/AddPlace",
        element:<AddPlace />
        
    }
])