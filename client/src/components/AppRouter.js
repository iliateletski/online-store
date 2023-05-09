import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { Context } from "..";
import Shop from "../pages/Shop";
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {

    const{user} = useContext(Context);

    return (
        <Routes>
            {user._isAuth && authRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element}/>
            )}   
            {publicRoutes.map(({path, element}) => 
                <Route key={path} path={path} element={element}/>
            )}   
            <Route path="*" element={<Shop/>}/>
        </Routes>
    )
})

export default AppRouter;