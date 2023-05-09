import { useContext } from "react";
import { Context } from "..";


export const useSelectBasketDevice = () => {

    const{basket} = useContext(Context);

    const selectDeviceAll = (bolean) => {
        basket.setDevices(
            basket._devices.map(d => ({...d, checked: bolean}))
        );
        
        basket.setSelectedDevicesId(
            bolean 
            ? basket._devices.map(d => d.device.id)
            : []
        );
    }
 
    
    const selectDevice = (bolean, deviceId) => {
        basket.setDevices(
            basket._devices.map(d => {
                if(d.device.id === deviceId) return {...d, checked: bolean}
                return d;
            }) 
        );

        basket.setSelectedDevicesId(
            bolean 
            ? [...basket._selectedDevicesId, deviceId]
            : basket._selectedDevicesId.filter(d => d !== deviceId )
        );
    }

    return {selectDeviceAll, selectDevice};
}




