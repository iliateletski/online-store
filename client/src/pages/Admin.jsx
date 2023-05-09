import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {

    const[brandVisible, setBarndVisible] = useState(false);
    const[deviceVisible, setDeviceVisible] = useState(false);
    const[typeVisible, setTypeVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button 
                className="mt-2 p-2" variant="outline-dark"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                className="mt-2 p-2" variant="outline-dark"
                onClick={() => setBarndVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                className="mt-2 p-2" variant="outline-dark"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство 
            </Button>
            <CreateBrand
                onHide={() => setBarndVisible(false)}
                show={brandVisible}
            />
            <CreateDevice
                onHide={() => setDeviceVisible(false)}
                show={deviceVisible}
            />
            <CreateType
                onHide={() => setTypeVisible(false)}
                show={typeVisible}
            />
        </Container>
    )
}

export default Admin