import { makeAutoObservable } from "mobx";

export class BasketStore {
    constructor() {
        this._isBasket = false;
        this._basket = {};
        this._devices = [];
        this._basketDevices = {};
        this._selectedDevicesId = [];
        makeAutoObservable(this)
    }

    setIsBasket(bolean) {
        this._isBasket = bolean
    }

    setBasket(basket) {
        this._basket = basket;
    }

    setBasketDevices(basketDevices) {
        this._basketDevices = basketDevices;
    }

    setSelectedDevicesId(devices) {
        this._selectedDevicesId = devices
    }

    setIsBasketDecice(bolean) {
        this._isBasketDecice = bolean;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    get isBasket() {
        return this._isBasket;
    }

    get basket() {
        return this._basket;
    }

    get basketDevices() {
        return this._basketDevices;
    }

    get selectedDevicesId() {
        return this._selectedDevices;
    }

    get isBasketDecice() {
        return this._isBasketDecice;
    }

    get devices() {
        return this._devices;
    }

}