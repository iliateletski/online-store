import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Context } from "../..";
import classes from "./Order.module.css"

const Order = observer(() => {

    const[totalPrice, setTotalPrice] = useState(0);
    const[totalWeight, setTotalWeight] = useState(0);
    const[count, setCount] = useState(0);
    const{basket} = useContext(Context);
    const rootClass = [classes.order];
    console.log(basket._devices)

    const calcTotalPrice = () => {
        let price = 0;
        let count = 0
        basket._devices.forEach(d => {
            if(d.checked) {
                price += d.device.price
                count++;
            }
        });
        setCount(count);
        setTotalPrice(price);
    }

    const calcTotalWeight = () => {
        let weight = 0;
        basket._devices.forEach(d => {
            if(d.checked) {
                weight += d.device.weight
            }
        });
        weight >= 1000 
        ? setTotalWeight(`${weight / 1000} кг`) 
        : setTotalWeight(`${weight} гр`);
    }

    useEffect(() => {
        calcTotalPrice();
        calcTotalWeight();
    }, [basket._devices]);

    if(!count) {

        rootClass.push(classes.no_active);

        return(
            <div className={rootClass.join(' ')}>
                <div >
                    <button 
                        className={classes.order__btn}
                        disabled
                        onClick={() => console.log('dshgdsa')}
                    >
                        Перейти к оформлению
                    </button>
                </div>
                <div className={classes.order__box}>
                    <div className={classes.order__boxInner}>
                        <div>
                            <Image
                                className={classes.order__img}
                                src="https://ir-1.ozone.ru/graphics/ozon/cart/total/info.svg"/>
                        </div>
                        <span 
                            className={classes.order__text}
                        >
                            Выберите товары, чтобы перейти к оформлению заказа
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={rootClass.join(' ')}>
            <div className={classes.order__box}>
                <button className={classes.order__btn}>Перейти к оформлению</button>
            </div>
            <div className={classes.order__box}>
                <h2 
                    className={classes.title}
                >
                    Ваша корзина
                </h2>
                <div 
                    className={classes.desc}
                >
                    <span>Товары</span>
                    <span>{count}</span>
                </div>
                <div 
                    className={classes.desc}
                >
                    <span>Вес</span>
                    <span>{totalWeight}</span>
                </div>
            </div>
            <div 
                style={{border:'none'}}
                className={classes.order__box}>
                <div className={classes.price}>
                    <span className={classes.title}>Общая стоимость</span>
                    <span className={classes.title}>{`${totalPrice} ₽`}</span>
                </div>
            </div>
        </div>
    )
});

export default Order;