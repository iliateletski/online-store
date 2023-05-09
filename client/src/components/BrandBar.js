import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {

    const{device} = useContext(Context);

    return(
        <Row className="d-flex">
            {device._brands.map(brand => 
                <Card
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device._selectedBrand.id ? 'danger' : 'gray'}
                    key={brand.id}
                    className="p-2  m-1"                
                    style={{maxWidth: 'max-content', cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    )
});

export default BrandBar;