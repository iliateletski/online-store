import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import BasketBar from "../components/basketBar/BasketBar";
import BasketDevice from "../components/BasketDevice";
import Order from "../components/order/Order";
import { fetchBasketDevices, update } from "../http/basketAPI";

const Basket = observer(() => {

    const{basket} = useContext(Context);
    const{count, rows} = basket._basketDevices;

    const checkCheckbox = async (bolean, id = {}) => {
        await update({...id, checked: bolean});
        fetchBasketDevices(basket._basket.id).then(data => basket.setBasketDevices(data));
    }

    useEffect(() => {
        if(basket._isBasket) {
            fetchBasketDevices(basket._basket.id)
            .then(data => {
                basket.setBasketDevices(data);
            });
        }
        return () => {
            basket.setSelectedDevicesId([]);
            basket.setDevices([]);
        };
    }, [basket._isBasket]);
    
    if(!count) {
        return(
            <Container
                className="mt-5"
            >
                <div
                    style={{fontSize: 30, fontWeight: 700, lineHeight: '25px', padding: '7px 0'}}
                >
                    Корзина пуста
                </div>
            </Container>
        )
    }

    return (
        <Container 
            className="mt-5"
            >
            <div
                className="mb-5"
                style={{display: 'flex'}}
            >
                <div
                    style={{fontSize: 30, fontWeight: 700, lineHeight: '25px', padding: '7px 0'}}
                >
                    Корзина
                </div>
                <div style={{fontSize: 15, }}>
                    {count}
                </div>
            </div>
            
            <div 
                style={{display: 'flex', justifyContent: 'space-between'}}
            >
                <div
                    style={{display: 'flex', flexDirection: 'column', width: '100%'}}
                >
                    <BasketBar checkCheckbox={checkCheckbox}/>
                    {rows.map( r => 
                        <BasketDevice
                            key={r.id}
                            basketDevice={r}
                            checkCheckbox={checkCheckbox}
                        />
                    )}
                </div>    
                <Order/>
            </div>
        </Container>
    )
})

export default Basket