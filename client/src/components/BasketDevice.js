import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { Context } from "..";
import star from "../assets/star.svg";
import { useSelectBasketDevice } from "../hook/useSelectBasketDevice";
import { fetchOneDivice } from "../http/deviceAPI";
import RemoveBasketDevice from "./modals/RemoveBasketDevice";

const BasketDevice = observer(({basketDevice, checkCheckbox}) => {

    const[device, setDevice] = useState({});
    const[removeVisible, setRemoveVisible] = useState(false);
    const{basket} = useContext(Context);
    const{selectDevice} = useSelectBasketDevice();
            
    useEffect(() => {
        fetchOneDivice(basketDevice.deviceId)
        .then(data => {
            setDevice(data);
        });  
        if(basketDevice.checked) basket.setSelectedDevicesId([...basket._selectedDevicesId, basketDevice.deviceId])     
    }, []);

    useEffect(() => {
        if('id' in device){
            basket.setDevices([
                ...basket._devices,
                {checked: basketDevice.checked, device}
            ]); 
        }
    }, [device]);

    return (
        <div className="basket__item">
            <Form className="baslet__check">
                <Form.Check
                    type="checkbox"
                    checked={basketDevice.checked}
                    onChange={e => {
                        checkCheckbox(e.target.checked, {id: basketDevice.id});
                        selectDevice(e.target.checked, device.id)
                    }}
                />
            </Form>
            <div className="basket__item-box">
                <div>
                    <Image 
                        className="basket__item-img"
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </div>
                <div className="basket__item-info">
                    <div className="basket__info-box">
                        <div className="basket__item-title">
                            {device.name}
                        </div>
                        <div className="basket__item-rating">
                            <div>{device.rating}</div>
                            <Image src={star}/>
                        </div>
                        <button 
                            className="basket__item-btn"
                            onClick={() => setRemoveVisible(true)}
                            value={basketDevice.id}
                        >
                            Удалить
                        </button>
                    </div>
                    <div className="basket__item-price">{device.price}</div>
                </div>
            </div>
            <RemoveBasketDevice
                show={removeVisible}
                basketDevice={basketDevice}
                onHide={() => setRemoveVisible(false)}
            />
        </div>
    )
})

export default BasketDevice;