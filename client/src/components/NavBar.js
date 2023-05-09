import React, { useContext } from "react";
import { Context } from "..";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { NavLink, useNavigate } from "react-router-dom";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BASKET_ROUTE } from "../consts";
import Button from "react-bootstrap/Button"
import {observer} from "mobx-react-lite"

const NavBar = observer( () => {
    
    const{user} = useContext(Context); 
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user._isAuth
                    ? <Nav style={{color: 'white'}}>
                        <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>Админ</Button>
                        <Button variant="outline-light" style={{marginLeft: '5px'}} onClick={() => navigate(BASKET_ROUTE)}>Корзина</Button>
                        <Button variant="outline-light" style={{marginLeft: '5px'}} onClick={() => logOut()}>Выйти</Button>
                    </Nav>

                    : <Nav className="ml-auto">
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }

            </Container>
        </Navbar>

    )
})

export default NavBar;