import React, { useContext } from "react";
import {observer} from "mobx-react-lite"
import { Context } from "..";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    
    const{device} = useContext(Context);


    return (
        <ListGroup>
            {device._types.map(type => 
                <ListGroup.Item
                    style={{cursor: 'poineter'}}
                    onClick={() => device.setSelectedType(type)}
                    active={type.id === device._selectedType.id}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
});

export default TypeBar;