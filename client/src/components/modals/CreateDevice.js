import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {

    const[info, setInfo] = useState([]);
    const{device} = useContext(Context);
    const[name, setName] = useState('');
    const[price, setPrice] = useState();
    const[weight, setWeight] = useState();
    const[file, setFile] = useState(null);

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data));
        fetchTypes().then(data => device.setTypes(data));
    }, []);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('weight', `${weight}`);
        formData.append('img', file);
        formData.append('brandId', device._selectedBrand.id);
        formData.append('typeId', device._selectedType.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >       
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Добавить устройство
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form>
                        <Dropdown>
                            <Dropdown.Toggle>
                                {device._selectedType.name || 'Выберите тип'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device._types.map(type => 
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-2 ">
                            <Dropdown.Toggle>
                                {device._selectedBrand.name || 'Выберите бренд'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device._brands.map(brand => 
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите название устройства"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите вес устройства в граммах"
                            value={weight}
                            type='number'
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                        <Form.Control
                            className="mt-3"
                            type="number"
                            placeholder="Введите стоимость устройства"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={(e) => selectFile(e)}
                        />
                        <hr/>
                        <Button
                            variant="outline-dark"
                            onClick={addInfo}
                        >
                            Добавить новое свойтсво
                        </Button>
                        {info.map(i => 
                            <Row 
                                className="mt-3"
                                key={i.number}
                            >
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название свойства"
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание свойства"
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeInfo(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
              <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;