import { observer } from "mobx-react-lite";
import React from "react";
import { Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { Card } from "react-bootstrap";
import star from "../assets/star.svg"
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../consts";


const DeviceItem = observer(({device}) => {

    const navigate = useNavigate();

    return (
        <Col className="mt-3" md={3} onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                <Image style={{width: 150, height: 150}} src={process.env.REACT_APP_API_URL + device.img} />
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div>{}</div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className="mr-3">{device.rating}</div>
                        <div>
                            <Image style={{width: 15, height: 15}} src={star}/>
                        </div>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    )
});

export default DeviceItem;