import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import { Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchDivices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop =  observer(() => {

    const{device} = useContext(Context);

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data));
        fetchTypes().then(data => device.setTypes(data));
        fetchDivices(null, null, device._page, device._limit).then(data =>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        });
    }, []);

    useEffect(() => {
        fetchDivices(device._selectedBrand.id, device._selectedType.id, device._page, device._limit).then(data =>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        });
    },[device._selectedBrand, device._selectedType, device._page])


    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages className="mt-4"/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop