import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

const Pages = observer(() => {
    
    const{device} = useContext(Context);
    const pageCount = Math.ceil(device._totalCount / device._limit);
    const pages = [];

    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination style={{position: 'fixed', bottom: 20}}>
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={device._page === page}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;