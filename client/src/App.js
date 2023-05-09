import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar";
import { fetchBasket } from "./http/basketAPI";
import { check } from "./http/userAPI";

const App = observer( () => {

  const{user} = useContext(Context);
  const{basket} = useContext(Context);
  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
    }).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if(user._isAuth) {
      fetchBasket(user._user.id).then(data => {
        basket.setBasket(data);
        basket.setIsBasket(true);
      });
    }
  }, [user._isAuth])
  
  console.log(basket._basket)
  if(isLoading){
    return <Spinner animation="border" role="status"></Spinner>
  }

  return(
    <BrowserRouter >
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  )
});

export default App;
