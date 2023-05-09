import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./consts";
import Basket from "./pages/Basket"
import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import DevicePage from "./pages/DevicePage"


export const authRoutes = [
    {path: BASKET_ROUTE, element: <Basket/>},
    {path: ADMIN_ROUTE, element: <Admin/>},
];

export const publicRoutes = [
    {path: SHOP_ROUTE, element: <Shop/>},
    {path: LOGIN_ROUTE, element: <Auth/>},
    {path: REGISTRATION_ROUTE, element: <Auth/>},
    {path: DEVICE_ROUTE + '/:id', element: <DevicePage/>},
];