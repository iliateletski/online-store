import { $authHost } from ".";

export const fetchBasket = async (userId) => {
    const{data} = await $authHost.get('api/basket', {
        params:{
            userId
        }
    });
    return data;
}

export const fetchBasketDevices = async (basketId) => {
    const{data} = await $authHost.get(`api/basket/${basketId}`);
    return data;
}

export const fetchOneBasketDevice = async (id) => {
    const {data} = await $authHost.get('api/basket/getOne', {
        params:{id}
    });
    return data;
}

export const addToBasket = async (basketDevice) => {
    const{data} = await $authHost.post(`api/basket`, basketDevice);
    return data;
}

export const update = async (basketDevice) => {
    const{data} = await $authHost.put('api/basket/update', basketDevice);
    return data;
}

export const removeFromBasket = async (id) => {
    const{data} = await $authHost.delete('api/basket', {data:{id}});
    return data;
}