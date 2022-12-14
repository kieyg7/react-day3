import {createBrowserRouter} from "react-router-dom";
import Root from "./Root";
import NotFound from "./screens/NotFound";
import ErrorComponent from "./screens/ErrorComponent";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import Price from "./screens/Price";
import Chart from "./screens/Chart";


const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        children: [
            {
                path: ':coinId',
                element: <Coin />,
                children: [
                    {
                        path: 'price',
                        element: <Price />
                    },
                    {
                        path: 'chart',
                        element: <Chart />
                    },
                ],
                errorElement: <ErrorComponent />,
            },
            {
                path:"",
                element: <Coins />,
            },
        ],
        errorElement: <NotFound />
    },
]);

export default router;

