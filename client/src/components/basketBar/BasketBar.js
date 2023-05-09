import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Context } from "../..";
import { useSelectBasketDevice } from "../../hook/useSelectBasketDevice";
import RemoveBasketDevice from "../modals/RemoveBasketDevice";
import classes from "./BasketBar.module.css"

const BasketBar = observer(({checkCheckbox}) => {

    const[removeVisible, setRemoveVisible] = useState(false);
    const{basket} = useContext(Context);
    const[checked, setChecked] = useState(false);
    const basketId = basket._basket.id;
    const {selectDeviceAll} = useSelectBasketDevice(true);

    const changeChecked = () => {
        if(basket._devices.length === 0) return; 

        for(let i = 0; i < basket._devices.length; i++) {
            if(!basket._devices[i].checked) {
                setChecked(false);
                return;
            }
        }
        setChecked(true);
    }

    useEffect(() => {
        changeChecked();
    }, [basket._devices])
    
    return (
        <div className={classes.inner}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Form.Check
                    className={classes.form} 
                    type="checkbox"
                    label='Выбрать все'
                    id="all"
                    checked={checked}
                    onChange={e => {
                        checkCheckbox(e.target.checked, {basketId});
                        selectDeviceAll(e.target.checked);
                    }}
                />
                {basket._selectedDevicesId.length > 0 &&
                    <button className={classes.remove__btn} onClick={() => setRemoveVisible(true)}>
                        Удалить выбранные
                    </button>
                }
            </div>
            <RemoveBasketDevice
                show={removeVisible}
                onHide={() => setRemoveVisible(false)}
            />
        </div>
    )
});

export default BasketBar;
