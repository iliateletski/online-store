import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../..";
import { fetchBasketDevices, removeFromBasket } from "../../http/basketAPI";

const RemoveBasketDevice = ({show, onHide, basketDevice}) => {

    const{basket} = useContext(Context);

    const remove = async () => {

        if(basketDevice){
            await removeFromBasket(basketDevice.id);
        } else {
            const arrId = JSON.stringify(basket._selectedDevicesId);
            await removeFromBasket(arrId);
        }
        fetchBasketDevices(basket._basket.id).then(data => {
            basket.setBasketDevices(data);
            
            basket.setDevices(
                basketDevice
                ? basket._devices.filter(d => d.device.id !== basketDevice.deviceId)
                : basket._devices.filter(d => !basket._selectedDevicesId.includes(d.device.id))
                );
                basket.setSelectedDevicesId([]);
                onHide();
            });
        }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >       
            <Modal.Header 
                closeButton
                style={{padding: '40px 48px 16px'}}
                >
              <Modal.Title 
                id="contained-modal-title-vcenter"
                style={{fontSize: 20, fontWeight: 700, lineHeight: '26px'}}
                >
                {basketDevice ? 'Удалить товар' : 'Удалить товары'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: 14,padding: '16px 48px'}}>
                <div>
                    {
                        basketDevice
                        ? 'Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно.'
                        : 'Вы точно хотите удалить выбранные товары? Отменить данное действие будет невозможно.'
                    }
                </div>
            </Modal.Body>
            <Modal.Footer
                style={{justifyContent: 'start', borderTop: 'none', padding: '16px 48px 48px'}}
            >
              <Button 
                variant="primary" 
                onClick={remove}
                style={{margin: 0}}
            >
                Удалить
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemoveBasketDevice;