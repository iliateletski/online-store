import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import bigStar from "../assets/bigStar.png"
import { fetchOneDivice } from "../http/deviceAPI";


const DevicePage = () => {

    const{id} = useParams();
    const[device, setDevice] = useState({info: []});

    useEffect(() => {
        fetchOneDivice(id).then(data => setDevice(data));
    },[]);

    return (
        <Container className="mt-3">
            <Row className="d-flex justify-content-between align-items-center">
                <Col md={4}>
                    <Image style={{width: 300, height: 300}} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{textAlign: 'center'}}>
                            {device.name}
                        </h2>
                        <div 
                            className="d-flex justify-content-center align-items-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 300, height: 300, backgroundSize: 'cover', fontSize: 48}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                    <Card 
                        className="d-flex justify-content-around align-items-center"
                        style={{width: 300, height: 300, fontSize: 32, border: '2px solid lightgray'}}    
                    >
                        <div>{`От: ${device.price} руб`}</div>
                        <Button variant="outline-dark">Добавить в корзину</Button>
                    </Card>
                </Col>
                <Row className="d-flex flex-column m-3">
                    <h2 style={{fontSize: 32, padding: 0}}>Характеристики</h2>
                    {device.info.map(((d, index) => 
                        <Row 
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                            key={d.id}
                        >
                            {d.title}: {d.description}
                        </Row>
                    ))}
                </Row>
            </Row>
        </Container>
    )
}

export default DevicePage